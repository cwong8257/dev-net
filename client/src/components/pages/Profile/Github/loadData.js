const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
const clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

export default async (githubUsername, count = 5, sort = 'updated', direction = 'desc') => {
  if (!githubUsername) {
    return [];
  }

  try {
    const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=${count}&sort=${sort}&direction=${direction}&client_id=${clientId}&client_secret=${clientSecret}`);
    const repos = await response.json();

    const colorsResponse = await fetch('/github_colors.json');
    const colors = await colorsResponse.json();

    repos.forEach((repo) => {
      repo.language_color = colors[repo.language].color;
    });

    return repos;
  } catch (err) {
    return [];
  }
};
