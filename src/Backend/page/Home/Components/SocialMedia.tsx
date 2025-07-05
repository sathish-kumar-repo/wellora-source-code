const SocialMedia = () => {
  const socialLinks = [
    {
      name: "Facebook",
      url: "https://facebook.com",
      icon: "/wellora/web-images/facebook.png"
    },
    {
      name: "Twitter", 
      url: "https://twitter.com",
      icon: "/wellora/web-images/twitter.png"
    },
    {
      name: "Instagram",
      url: "https://instagram.com", 
      icon: "/wellora/web-images/instagram.png"
    },
    {
      name: "GitHub",
      url: "https://github.com/sathish-kumar-repo/",
      icon: "/wellora/web-images/github.png"
    }
  ];

  return (
    <div className="flex items-center gap-3">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          aria-label={social.name}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-10 h-10 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600"
        >
          <img 
            src={social.icon} 
            alt={`${social.name} icon`}
            className="w-5 h-5 transition-all duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </a>
      ))}
    </div>
  );
};

export default SocialMedia;