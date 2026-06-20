import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-page">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data We Collect</h2>
              <p className="text-gray-600 mb-4">
                When you interact with our AI voice agent Ada, we collect:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                <li>Your name and email address</li>
                <li>Company name and employee count</li>
                <li>Your questions and conversation content</li>
                <li>Conversation ID for technical purposes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why We Collect Data</h2>
              <p className="text-gray-600 mb-4">
                We collect this information to:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                <li>Respond to your business inquiries effectively</li>
                <li>Provide personalized assistance and recommendations</li>
                <li>Follow up on potential business opportunities</li>
                <li>Improve our services and user experience</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Storage & Retention</h2>
              <p className="text-gray-600 mb-4">
                Your data is stored securely and retained for up to 24 months. We may retain 
                data longer if required by law or for legitimate business purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Rights</h2>
              <p className="text-gray-600 mb-4">Under GDPR, you have the right to:</p>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong>Erasure:</strong> Request deletion of your personal data</li>
                <li><strong>Portability:</strong> Receive your data in a structured format</li>
                <li><strong>Object:</strong> Object to processing of your personal data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Exercising Your Rights</h2>
              <p className="text-gray-600 mb-4">
                To exercise any of these rights, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-gray-800 font-medium">Email: privacy@8085.ai</p>
                <p className="text-gray-600 text-sm mt-1">
                  We will respond to your request within 30 days.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Security</h2>
              <p className="text-gray-600 mb-4">
                We implement appropriate technical and organizational measures to protect 
                your personal data against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have questions about this privacy policy or our data practices, 
                please contact us at privacy@8085.ai.
              </p>
            </section>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
