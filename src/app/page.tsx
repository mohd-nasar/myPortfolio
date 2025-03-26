import React from "react";

import { Heading, Flex, Text, Button, Avatar, RevealFx, Column } from "@/once-ui/components";
import { Projects } from "@/components/work/Projects";

import { baseURL, routes } from "@/app/resources";
import { home, about, person } from "@/app/resources/content";

export async function generateMetadata() {
  const title = home.title;
  const description = home.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
  };
}

export default function Home() {
  return (
    <Column maxWidth="full" gap="xl" horizontal="center">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: home.title,
            description: home.description,
            url: `https://${baseURL}`,
            image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
            publisher: {
              "@type": "Person",
              name: person.name,
              image: {
                "@type": "ImageObject",
                url: `${baseURL}${person.avatar}`,
              },
            },
          }),
        }}
      />
      <Column fillWidth paddingY="l" gap="m">
        <Column maxWidth="s">
          <RevealFx translateY="4" fillWidth horizontal="start" paddingBottom="m">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="start" paddingBottom="m">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx translateY="12" delay={0.4} horizontal="start">
            <Flex gap="16">
              <Button
                id="about"
                data-border="rounded"
                href="/about"
                variant="secondary"
                size="m"
                arrowIcon
              >
                <Flex gap="8" vertical="center">
                  {about.avatar.display && (
                    <Avatar
                      style={{ marginLeft: "-0.75rem", marginRight: "0.25rem" }}
                      src={person.avatar}
                      size="m"
                    />
                  )}
                  {about.title}
                </Flex>
              </Button>
              {/* New Download CV Button */}
              <Button
                id="download-cv"
                data-border="rounded"
                href="https://drive.google.com/file/d/1ky0pWJzQJVSTu31xQ2t81POA0lnugJTX/view?usp=drivesdk"
                variant="primary"
                size="m"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV
              </Button>
            </Flex>
          </RevealFx>
        </Column>
      </Column>
      {/* Add an image at the bottom */}
      <Column horizontal="center" paddingTop="none">
        <img
          src="/images/projects/project-01/cover-06.jpg"
          alt="Footer Image"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </Column>
      
      {/* Add the 'Getting Bored' section after the image */}
      <Column horizontal="center" paddingTop="l">
        <Flex gap="16" alignItems="center">
          <Text style={{ fontSize: "2rem", fontWeight: "bold" }}>Getting Bored? Chat with me</Text>
          <Button
            id="chatbot-link"
            href="/blog"
            variant="primary"
            size="m"
          >
            Chat Now
          </Button>
        </Flex>
      </Column>
    </Column>
  );
}
