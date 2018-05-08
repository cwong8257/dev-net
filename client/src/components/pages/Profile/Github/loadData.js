const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
const clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

export default async (githubUsername) => {
  if (!githubUsername) {
    return [];
  }

  try {
    const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=5&sort=created: asc&client_id=${clientId}&client_secret=${clientSecret}`);
    const repos = await response.json();

    return repos;
  } catch (err) {
    return [];
  }
};
