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

interface PasswordResetEmailProps {
  username?: string;
  resetUrl?: string;
}

export default function PasswordResetEmail({
  username = "Novel Enthusiast",
  resetUrl = "https://novilist.com/reset-password?token=123",
}: PasswordResetEmailProps) {
  const previewText = "Reset your Novilist password";

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
                Reset Your Password
              </Heading>
              <Text className="text-gray-600 mt-2 mb-0">
                Follow the link below to choose a new password
              </Text>
            </Section>

            <Hr className="border-gray-200 my-8" />

            {/* Main Content */}
            <Section>
              <Text className="text-gray-700 text-base">Dear {username},</Text>
              <Text className="text-gray-700 text-base">
                We received a request to reset your password for your Novilist
                account. Click the button below to create a new password:
              </Text>

              {/* Reset Button */}
              <Button
                className="bg-[#42758F] rounded-lg text-white py-3 px-12 text-base font-medium hover:bg-[#42758F]/90 block mx-auto my-8"
                href={resetUrl}
              >
                Reset Password
              </Button>

              <Text className="text-gray-600 text-sm">
                If the button doesn't work, you can also copy and paste this
                link into your browser:
              </Text>
              <Text className="text-[#42758F] text-sm break-all">
                {resetUrl}
              </Text>

              <Text className="text-amber-600 text-sm mt-6">
                This password reset link will expire in 1 hour.
              </Text>

              <Text className="text-gray-600 text-sm mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                If you didn't request a password reset, please ignore this
                email.
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
