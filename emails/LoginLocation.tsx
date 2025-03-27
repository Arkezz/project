import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

interface NewLoginEmailProps {
  username?: string;
  verifyUrl?: string;
  loginInfo: {
    device: string;
    location: string;
    timestamp: string;
  };
}

export default function NewLoginEmail({
  username = "Novel Enthusiast",
  verifyUrl = "https://novilist.com/verify-login?token=123",
  loginInfo = {
    device: "iPhone 13",
    location: "Tokyo, Japan",
    timestamp: "March 15, 2024 at 14:30 JST",
  },
}: NewLoginEmailProps) {
  const previewText = "New login detected on your Novilist account";

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-[#F7F4F0] my-auto mx-auto font-sans">
          <Container className="bg-white border border-gray-200/50 rounded-lg p-8 my-10 mx-auto shadow-sm">
            {/* Header */}
            <Section className="mt-4 text-center">
              <Heading className="text-2xl font-bold text-[#42758F] m-0">
                New Login Detected
              </Heading>
              <Text className="text-gray-600 mt-2 mb-0">
                We noticed a new sign-in to your account
              </Text>
            </Section>

            <Hr className="border-gray-200 my-8" />

            {/* Main Content */}
            <Section>
              <Text className="text-gray-700 text-base">Dear {username},</Text>
              <Text className="text-gray-700 text-base">
                We detected a new login to your Novilist account from a location
                we haven't seen before. For your security, please verify this
                login if it was you.
              </Text>

              {/* Login Details */}
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 my-6">
                <Text className="text-gray-700 font-medium mb-4">
                  Login Details:
                </Text>
                <div className="space-y-2">
                  <Text className="text-gray-600 text-sm m-0">
                    📱 Device: {loginInfo.device}
                  </Text>
                  <Text className="text-gray-600 text-sm m-0">
                    📍 Location: {loginInfo.location}
                  </Text>
                  <Text className="text-gray-600 text-sm m-0">
                    🕒 Time: {loginInfo.timestamp}
                  </Text>
                </div>
              </div>

              {/* Verify Button */}
              <Button
                className="bg-[#42758F] rounded-lg text-white py-3 px-12 text-base font-medium hover:bg-[#42758F]/90 block mx-auto my-8"
                href={verifyUrl}
              >
                Yes, This Was Me
              </Button>

              <Text className="text-gray-600 text-sm">
                If the button doesn't work, you can also copy and paste this
                link into your browser:
              </Text>
              <Text className="text-[#42758F] text-sm break-all">
                {verifyUrl}
              </Text>

              <Text className="text-red-600 text-sm mt-6 p-4 bg-red-50 rounded-lg border border-red-100">
                ⚠️ If you don't recognize this login activity, please{" "}
                <Link
                  href="https://novilist.com/account/security"
                  className="text-red-600 font-medium hover:underline"
                >
                  change your password immediately.
                </Link>
              </Text>
            </Section>

            <Hr className="border-gray-200 my-8" />

            {/* Footer */}
            <Section>
              <Text className="text-gray-500 text-xs text-center">
                © {new Date().getFullYear()} Novilist. All rights reserved.
                <br />
                <Link href="#" className="text-[#42758F] hover:underline">
                  Terms of Service
                </Link>
                {" • "}
                <Link href="#" className="text-[#42758F] hover:underline">
                  Privacy Policy
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
