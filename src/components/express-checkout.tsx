"use client";

// This component shows available payment methods as trust indicators
// Apple Pay and Google Pay are handled automatically by Stripe Checkout
// when enabled in Stripe Dashboard

export default function ExpressCheckout() {
    return (
        <div className="w-full">
            {/* Payment Methods Indicator */}
            <div 
                className="flex flex-col items-center gap-3 py-4 px-6 bg-white"
                style={{
                    border: "2px solid #000",
                }}
            >
                <span className="text-[10px] uppercase tracking-[0.15em] text-black/60 font-bold">
                    We Accept
                </span>
                
                {/* Payment Icons */}
                <div className="flex items-center gap-4 flex-wrap justify-center">
                    {/* Visa */}
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" 
                        alt="Visa" 
                        className="h-5 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                    />

                    {/* Mastercard */}
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" 
                        alt="Mastercard" 
                        className="h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                    />

                    {/* Apple Pay */}
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" 
                        alt="Apple Pay" 
                        className="h-8 w-auto object-contain"
                    />

                    {/* Google Pay */}
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" 
                        alt="Google Pay" 
                        className="h-8 w-auto object-contain"
                    />

                    {/* Amazon Pay */}
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/2/29/Amazon_Pay_logo.svg" 
                        alt="Amazon Pay" 
                        className="h-8 w-auto object-contain"
                    />
                </div>
            </div>

            {/* Security Note */}
            <p className="text-center text-[10px] uppercase tracking-[0.15em] text-black/50 font-bold mt-3">
                🔒 Secured by Stripe • 256-bit SSL Encryption
            </p>
        </div>
    );
}
