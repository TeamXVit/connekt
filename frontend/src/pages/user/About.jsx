import {
    Box,
    Container,
    Link,
    Typography,
    Avatar,
    IconButton,
  } from "@mui/material";
  import GitHubIcon from "@mui/icons-material/GitHub";
  import InstagramIcon from "@mui/icons-material/Instagram";
  import LinkedInIcon from "@mui/icons-material/LinkedIn";
  import EmailIcon from "@mui/icons-material/Email";
  
  const teamMembers = [
    {
      name: "Rohith VK",
      role: "UI/UX Designer",
      github: "https://github.com/RohiVK",
      instagram: "https://instagram.com/ro_hi.exe",
      linkedin: "https://linkedin.com/in/v-k-rohith-5a8764326",
    },
    {
      name: "Muhammad Sajid Y",
      role: "Frontend Developer",
      github: "https://github.com/muhammadsajidy",
      instagram: "https://instagram.com/_.sajid._04",
      linkedin: "https://linkedin.com/in/muhammadsajidy",
    },
    {
      name: "Ganesh M",
      role: "Backend Developer",
      github: "https://github.com/prodev717",
      instagram: "https://instagram.com/musicon717",
      linkedin: "https://linkedin.com/in/ganesh717",
    },
  ];
  
  export default function About() {
    return (
      <Container
        maxWidth={false}
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          minHeight: "100vh",
          pt: "75px",
          pb: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: { sm: "center", lg: "none" },
          gap: 4,
        }}
      >
        <Typography variant="h4">About Us</Typography>
  
        <Box sx={{ width: "90%" }}>
          <Typography variant="h6">Who We Are</Typography>
          <Typography>
            <strong>TeamX</strong> is a student-led open tech community at VIT-AP dedicated to building practical, impactful tech solutions for real-life problems. We believe in learning by doing, and we empower students to explore, innovate, and grow through collaborative projects and open-source development.
          </Typography>
        </Box>
  
        <Box sx={{ width: "90%" }}>
          <Typography variant="h6">What We Do</Typography>
          <Typography>
            Our mission is to create useful platforms and tools for the student community. From web and mobile apps to hardware-integrated systems, we turn ideas into working products. We host events, conduct workshops, and support peers in gaining industry-relevant skills through hands-on experience.
          </Typography>
        </Box>
  
        <Box sx={{ width: "90%" }}>
          <Typography variant="h6">Our Projects</Typography>
          <ul>
            <li><strong>Connekt:</strong> A campus-exclusive social platform to ask queries, find teammates, travel partners, and more.</li>
            <li><strong>Git2Know:</strong> An AI-powered GitHub profile and repository analysis tool that provides insightful summaries.</li>
            <li><strong>Vynkly:</strong> A search engine built for VIT-AP students to index, showcase, and connect all their innovations in one unified platform.</li>
          </ul>
        </Box>
  
        <Box sx={{ width: "90%" }}>
          <Typography variant="h6">Contact Us</Typography>
          <Typography>
            We'd love to hear from you! Reach out to us on:
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
            <IconButton href="mailto:teamx.0403@gmail.com" color="inherit">
              <EmailIcon />
            </IconButton>
            <IconButton href="https://instagram.com/teamx.vit" target="_blank" color="inherit">
              <InstagramIcon />
            </IconButton>
            <IconButton href="https://github.com/TeamXVit" target="_blank" color="inherit">
              <GitHubIcon />
            </IconButton>
          </Box>
        </Box>
  
        <Box sx={{ width: "90%" }}>
          <Typography variant="h6">Contributors</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            {teamMembers.map((member, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  p: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                }}
              >
                <Typography variant="subtitle1"><strong>{member.name}</strong></Typography>
                <Typography variant="body2">{member.role}</Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton href={member.github} target="_blank" color="inherit">
                    <GitHubIcon />
                  </IconButton>
                  <IconButton href={member.instagram} target="_blank" color="inherit">
                    <InstagramIcon />
                  </IconButton>
                  <IconButton href={member.linkedin} target="_blank" color="inherit">
                    <LinkedInIcon />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    );
  }
  