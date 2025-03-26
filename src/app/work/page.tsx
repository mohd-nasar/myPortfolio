import { getPosts } from "@/app/utils/utils";
import { Column, Heading, Text, Flex } from "@/once-ui/components";
import { Projects } from "@/components/work/Projects";
import { baseURL } from "@/app/resources";
import { person, work } from "@/app/resources/content";

export async function generateMetadata() {
  const title = work.title;
  const description = work.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/work/`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Work() {
  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      {/* <Heading variant="display-strong-xl" marginBottom="l">
        {work?.title || "Work"}
      </Heading>
      <Text variant="body-default-m" onBackground="neutral-weak" marginBottom="xl">
        {work?.description || "Description not available"}
      </Text> */}

      {/* Skills Section */}
      <Column fillWidth gap="l" marginBottom="xl">
        <Heading as="h2" variant="display-strong-s" marginBottom="m">
          Skills
        </Heading>
        <Flex
          gap="12"
          wrap
          horizontal="center"
          style={{
            justifyContent: "center",
          }}
        >
          {work?.skills?.map((skill, index) => (
            <Column
              key={`skill-${index}`}
              border="neutral-medium"
              radius="m"
              padding="m"
              gap="m"
              style={{
                maxWidth: "220px",
                minWidth: "200px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                height: "auto",
              }}
            >
              {/* Skill Image */}
              {skill.image && (
                <img
                  src={skill.image.src}
                  alt={skill.image.alt}
                  style={{
                    borderRadius: "var(--radius-m)",
                    width: "100%",
                    height: "120px",
                    objectFit: "cover",
                  }}
                />
              )}

              {/* Skill Title */}
              <Text variant="heading-strong-m">{skill.title}</Text>

              {/* Skill Tags */}
              <Flex gap="m" wrap>
                {skill.Tags?.map((tag, tagIndex) => (
                  <Text
                    key={`skill-tag-${index}-${tagIndex}`}
                    variant="body-default-xs"
                    onBackground="brand-weak"
                    border="neutral-medium"
                    padding="4"
                    radius="m"
                  >
                    {tag}
                  </Text>
                ))}
              </Flex>
            </Column>
          ))}
        </Flex>
      </Column>

      {/* Projects Section */}
      <Column fillWidth gap="l" marginBottom="xl">
        <Heading as="h2" variant="display-strong-s" marginBottom="m">
          Projects
        </Heading>
        <Flex
          gap="12"
          wrap
          horizontal="center"
          style={{
            justifyContent: "center",
          }}
        >
          {work?.projects?.map((project, index) => (
            <Column
              key={`project-${index}`}
              border="neutral-medium"
              radius="m"
              padding="m"
              gap="m"
              style={{
                maxWidth: "280px",
                minWidth: "260px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                height: "auto",
              }}
            >
              {/* Project Image */}
              {project.images && project.images.length > 0 && (
                <img
                  src={project.images[0].src}
                  alt={project.images[0].alt}
                  style={{
                    borderRadius: "var(--radius-m)",
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              )}

              {/* Project Title */}
              <Text variant="heading-strong-m">{project.title}</Text>

              {/* Project Description */}
              {project.description.map((desc, descIndex) => (
                <Text
                  key={`project-desc-${index}-${descIndex}`}
                  variant="body-default-m"
                  onBackground="neutral-weak"
                >
                  {desc}
                </Text>
              ))}

              {/* Project Tags */}
              <Flex gap="m" wrap>
                {project.Tags.map((tag, tagIndex) => (
                  <Text
                    key={`project-tag-${index}-${tagIndex}`}
                    variant="body-default-xs"
                    onBackground="brand-weak"
                    padding="4"
                  >
                    {tag}
                  </Text>
                ))}
              </Flex>
            </Column>
          ))}
        </Flex>
      </Column>

      {/* Coursework Section */}
      <Column fillWidth gap="l" marginBottom="xl">
        <Heading as="h2" variant="display-strong-s" marginBottom="m">
          Coursework
        </Heading>

        {/* Image placed after title */}
        <img
          src="/images/projects/project-01/cover-01.jpg"
          alt="Featured Project"
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "400px",
            objectFit: "cover",
            borderRadius: "var(--radius-m)",
            marginBottom: "m",
          }}
        />

        {work?.coursework?.map((course, index) => (
          <Column key={`course-${index}`} fillWidth gap="4">
            <Text variant="heading-strong-m">{course.title}</Text>
            <Text variant="body-default-m" onBackground="neutral-weak">
              {course.description}
            </Text>
          </Column>
        ))}
      </Column>
    </Column>
  );
}
