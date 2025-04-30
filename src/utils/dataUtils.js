import data from '../data/data.json';
import users from '../data/users.json';

export const getUserData = (username) => {
  const user = users.find(user => user.username === username);
  if (!user) return null;

  return {
    name: user.name,
    avatar: user.profilePic,
    tagLine: user.bio,
    bio: user.bio,
    location: user.location,
    socialProfiles: user.socialProfiles
  };
};

export const getUserPosts = (username) => {
  return data.filter(post => post.username === username);
};

export const getSocialLinks = (username) => {
  const user = users.find(user => user.username === username);
  if (!user || !user.socialProfiles) return [];

  const socialLinks = [];
  
  if (user.socialProfiles.linkedin) {
    socialLinks.push({
      platform: 'Linkedin',
      username: user.socialProfiles.linkedin,
      icon: 'FaLinkedin',
      bg: '#0A66C2',
      link: `https://linkedin.com/in/${user.socialProfiles.linkedin}`
    });
  }

  if (user.socialProfiles.twitter) {
    socialLinks.push({
      platform: 'Twitter',
      username: `@${user.socialProfiles.twitter}`,
      icon: 'FaTwitter',
      bg: '#1DA1F2',
      link: `https://twitter.com/${user.socialProfiles.twitter}`
    });
  }

  if (user.socialProfiles.instagram) {
    socialLinks.push({
      platform: 'Instagram',
      username: `@${user.socialProfiles.instagram}`,
      icon: 'FaInstagram',
      bg: '#E4405F',
      link: `https://instagram.com/${user.socialProfiles.instagram}`
    });
  }

  if (user.socialProfiles.github) {
    socialLinks.push({
      platform: 'GitHub',
      username: user.socialProfiles.github,
      icon: 'FaGithub',
      bg: '#24292E',
      link: `https://github.com/${user.socialProfiles.github}`
    });
  }

  return socialLinks;
}; 