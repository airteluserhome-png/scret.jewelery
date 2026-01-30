import { Resend } from "resend";

// Lazy initialization to avoid build errors
let resendInstance: Resend | null = null;

function getResend(): Resend {
    if (!resendInstance) {
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            throw new Error("RESEND_API_KEY is not set");
        }
        resendInstance = new Resend(apiKey);
    }
    return resendInstance;
}

interface OrderEmailData {
    customerEmail: string;
    customerName: string;
    productName: string;
    productPrice: string;
    orderNumber: string;
    shippingAddress?: {
        line1?: string;
        line2?: string;
        city?: string;
        state?: string;
        postal_code?: string;
        country?: string;
    };
}

export async function sendOrderConfirmationEmail(data: OrderEmailData) {
    const { customerEmail, customerName, productName, productPrice, orderNumber, shippingAddress } = data;

    const addressHtml = shippingAddress ? `
        <div style="background: #f9f9f9; padding: 20px; border: 2px solid #000; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Shipping To:</h3>
            <p style="margin: 0; color: #333;">
                ${shippingAddress.line1 || ""}<br>
                ${shippingAddress.line2 ? shippingAddress.line2 + "<br>" : ""}
                ${shippingAddress.city || ""}, ${shippingAddress.state || ""} ${shippingAddress.postal_code || ""}<br>
                ${shippingAddress.country || ""}
            </p>
        </div>
    ` : "";

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff; font-family: 'Helvetica Neue', Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="font-size: 48px; font-weight: 900; margin: 0; color: #FF0099; text-shadow: 2px 2px 0px #000;">
                SECRETLY
            </h1>
            <p style="font-size: 12px; letter-spacing: 3px; text-transform: uppercase; color: #666; margin-top: 10px;">
                Luxury Goods
            </p>
        </div>

        <!-- Order Confirmed Box -->
        <div style="background: #000; color: #fff; padding: 30px; text-align: center; margin-bottom: 30px;">
            <h2 style="margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 3px;">
                Order Confirmed ✓
            </h2>
            <p style="margin: 15px 0 0 0; font-size: 14px; opacity: 0.8;">
                Thank you for your purchase, ${customerName || "Valued Customer"}!
            </p>
        </div>

        <!-- Order Details -->
        <div style="border: 3px solid #000; padding: 25px; margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                        <span style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #999;">Order Number</span><br>
                        <strong style="font-size: 16px;">#${orderNumber}</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 15px 0; border-bottom: 1px solid #eee;">
                        <span style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #999;">Product</span><br>
                        <strong style="font-size: 18px;">${productName}</strong>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 15px 0;">
                        <span style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #999;">Total Paid</span><br>
                        <strong style="font-size: 24px; color: #FF0099;">${productPrice}</strong>
                    </td>
                </tr>
            </table>
        </div>

        ${addressHtml}

        <!-- What's Next -->
        <div style="background: #FF0099; color: #fff; padding: 25px; margin: 30px 0;">
            <h3 style="margin: 0 0 15px 0; font-size: 16px; text-transform: uppercase; letter-spacing: 2px;">
                What's Next?
            </h3>
            <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
                <li>Your order is being prepared with care</li>
                <li>You'll receive tracking info within 24-48 hours</li>
                <li>Worldwide shipping with full tracking included</li>
            </ul>
        </div>

        <!-- Contact -->
        <div style="text-align: center; padding: 30px 0; border-top: 2px solid #eee;">
            <p style="font-size: 14px; color: #666; margin: 0;">
                Questions? Reply to this email or contact us at<br>
                <a href="mailto:hello@secretly.jewelry" style="color: #FF0099; text-decoration: none; font-weight: bold;">
                    hello@secretly.jewelry
                </a>
            </p>
        </div>

        <!-- Footer -->
        <div style="text-align: center; padding-top: 30px;">
            <p style="font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 2px;">
                Secretly • Premium Luxury Goods
            </p>
            <p style="font-size: 10px; color: #ccc; margin-top: 10px;">
                © ${new Date().getFullYear()} Secretly. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
    `;

    try {
        const resend = getResend();
        const result = await resend.emails.send({
            from: "Secretly <hello@secretly.jewelry>",
            to: customerEmail,
            subject: `Order Confirmed - ${productName} | Secretly`,
            html: emailHtml,
        });

        console.log("[Email] Order confirmation sent:", result);
        return { success: true, data: result };
    } catch (error) {
        console.error("[Email] Failed to send order confirmation:", error);
        return { success: false, error };
    }
}
