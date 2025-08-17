import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const Feedback = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-center text-green-500 flex-1">GoJob</h1>
          <Phone className="h-6 w-6 text-green-500" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-medium text-gray-900 mb-8 text-center">
            Tell us what you love or hate about GoJob. This goes directly to the founders.
          </h2>

          <div className="bg-white rounded-2xl border border-gray-100 mb-6">
            <Textarea 
              placeholder="Your feedback..."
              className="min-h-[300px] border-0 resize-none focus:ring-0 rounded-2xl text-base"
            />
          </div>

          <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl text-lg font-medium">
            SEND
          </Button>
        </div>
      </div>

      {/* Bottom spacing for navigation */}
      <div className="h-20"></div>
    </div>
  );
};

export default Feedback;