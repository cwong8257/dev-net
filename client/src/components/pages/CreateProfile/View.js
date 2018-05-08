import React from 'react';
import PropTypes from 'prop-types';

import TextFieldGroup from '../../common/TextFieldGroup';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import InputGroup from '../../common/InputGroup';
import SelectListGroup from '../../common/SelectListGroup';

const View = ({
  displaySocialInputs,
  handle,
  company,
  website,
  location,
  status,
  skills,
  githubUsername,
  bio,
  twitter,
  facebook,
  linkedin,
  youtube,
  instagram,
  errors,
  handleChangeInput,
  handleSubmit,
  handleClickSocial,
}) => {
  let socialInputs;

  if (displaySocialInputs) {
    socialInputs = (
      <div>
        <InputGroup
          placeholder="Twitter Profile URL"
          name="twitter"
          icon="fab fa-twitter"
          value={twitter}
          onChange={handleChangeInput}
          error={errors.twitter}
        />

        <InputGroup
          placeholder="Facebook Page URL"
          name="facebook"
          icon="fab fa-facebook"
          value={facebook}
          onChange={handleChangeInput}
          error={errors.facebook}
        />

        <InputGroup
          placeholder="Linkedin Profile URL"
          name="linkedin"
          icon="fab fa-linkedin"
          value={linkedin}
          onChange={handleChangeInput}
          error={errors.linkedin}
        />

        <InputGroup
          placeholder="YouTube Channel URL"
          name="youtube"
          icon="fab fa-youtube"
          value={youtube}
          onChange={handleChangeInput}
          error={errors.youtube}
        />

        <InputGroup
          placeholder="Instagram Page URL"
          name="instagram"
          icon="fab fa-instagram"
          value={instagram}
          onChange={handleChangeInput}
          error={errors.instagram}
        />
      </div>
    );
  }

  const options = [
    { label: '-- Select Professional Status --', value: 0 },
    { label: 'Developer', value: 'Developer' },
    { label: 'Junior Developer', value: 'Junior Developer' },
    { label: 'Senior Developer', value: 'Senior Developer' },
    { label: 'Manager', value: 'Manager' },
    { label: 'Student or Learning', value: 'Student or Learning' },
    { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
    { label: 'Intern', value: 'Intern' },
    { label: 'Other', value: 'Other' },
  ];
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-10 col-lg-8 mx-auto">
          <h1 className="text-center">Create profile</h1>
          <p className="lead text-center">
            Let&apos;s get some information to make your profile stand out
          </p>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-sm-6">
                <TextFieldGroup
                  label="Handle"
                  placeholder="Handle"
                  name="handle"
                  value={handle}
                  onChange={handleChangeInput}
                  error={errors.handle}
                  info="A unique handle for your profile URL"
                />
              </div>
              <div className="col-sm-6">
                <TextFieldGroup
                  label="Location"
                  placeholder="Location"
                  name="location"
                  value={location}
                  onChange={handleChangeInput}
                  error={errors.location}
                  info="City & state (eg. Boston, MA)"
                  optional
                />
              </div>
              <div className="col-sm-6">
                <SelectListGroup
                  label="Status"
                  name="status"
                  value={status}
                  onChange={handleChangeInput}
                  options={options}
                  error={errors.status}
                  info="Give us an idea of where you are at in your career"
                />
              </div>
              <div className="col-sm-6">
                <TextFieldGroup
                  label="Company"
                  placeholder="Company"
                  name="company"
                  value={company}
                  onChange={handleChangeInput}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                  optional
                />
              </div>
              <div className="col-12">
                <TextFieldGroup
                  label="Skills"
                  placeholder="Skills"
                  name="skills"
                  value={skills}
                  onChange={handleChangeInput}
                  error={errors.skills}
                  info="Please use comma separated values (eg.
                  HTML, CSS, JavaScript, PHP)"
                />
              </div>
              <div className="col-sm-6">
                <TextFieldGroup
                  label="GitHub username"
                  placeholder="GitHub username"
                  name="githubUsername"
                  value={githubUsername}
                  onChange={handleChangeInput}
                  error={errors.githubUsername}
                  info="If you want your latest repos and a Github link, include your username"
                  optional
                />
              </div>
              <div className="col-sm-6">
                <TextFieldGroup
                  label="Website"
                  placeholder="Website"
                  name="website"
                  value={website}
                  onChange={handleChangeInput}
                  error={errors.website}
                  info="Could be your own website or company website"
                  optional
                />
              </div>
              <div className="col">
                <TextAreaFieldGroup
                  label="About me"
                  placeholder="About me"
                  name="bio"
                  value={bio}
                  onChange={handleChangeInput}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                  optional
                />
              </div>
            </div>

            <div className="mb-3">
              <button type="button" onClick={handleClickSocial} className="btn btn-light">
                Add Social Network Links
              </button>
              <span className="text-muted">Optional</span>
            </div>
            {socialInputs}
            <button className="btn btn-info mt-4">Create profile</button>
          </form>
        </div>
      </div>
    </div>
  );
};

View.propTypes = {
  displaySocialInputs: PropTypes.bool.isRequired,
  handle: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  skills: PropTypes.string.isRequired,
  githubUsername: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  twitter: PropTypes.string.isRequired,
  facebook: PropTypes.string.isRequired,
  linkedin: PropTypes.string.isRequired,
  youtube: PropTypes.string.isRequired,
  instagram: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleClickSocial: PropTypes.func.isRequired,
};

export default View;
