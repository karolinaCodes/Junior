const getProjectsByDevs = (devsProjects) => {
  const projectsByDevs = {};

  for (let project of devsProjects) {
    if (!projectsByDevs[project.junior_dev_id]) {
      projectsByDevs[project.junior_dev_id] = {
          devId: project.junior_dev_id,
          firstName: project.first_name,
          lastName: project.last_name,
          email: project.email,
          projects: [],
        };
    }

    projectsByDevs[project.junior_dev_id].projects.push({
      title: project.title,
      description: project.description,
      thumbnailPhotoUrl: project.thumbnail_photo_url,
      githubLink: project.github_link,
      liveLink: project.live_link,
    });

  }

  return Object.values(projectsByDevs);
};

module.exports = {
  getProjectsByDevs,
};
