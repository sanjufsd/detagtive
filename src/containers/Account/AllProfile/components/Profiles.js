/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { connect } from "react-redux";
import { FaPlus, FaTrash } from "react-icons/fa";
import ProfileDetails from "./ProfileDetails";
import { addProfile, updateProfile ,deleteProfile } from "../../../../redux/actions/profileActions";
import {withTranslation} from 'react-i18next'
import PropTypes from 'prop-types';
import { compose } from 'redux';
class Profiles extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    userProfiles: PropTypes.array.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      userProfiles: props.userProfiles,
      selectedProfile: {},
      mode: "create",
      isSelected: false
    };
  }

  static getDerivedStateFromProps(nextState, nextProps) {
    if(nextState.userProfiles.length !== nextProps.userProfiles){
      return {
        userProfiles: nextState.userProfiles,
      };
    }

  }

  handleProfileClick = obj => {
    this.setState({ selectedProfile: obj, mode: "show" });
  };

  buildProfileList() {
    let items = [];
    this.state.userProfiles.forEach(obj => {
      items.push(
        <div
          className={`profile-list ${(Object.keys(this.state.selectedProfile).length !== 0 && (obj["id"]===this.state.selectedProfile["id"])) && "selected"}`}
          onClick={() => this.handleProfileClick(obj)}
        >
          <div className="avatar">
            <img src="/img/12.png" alt="image missing" />
          </div>
          <div className="content-wrapper">
            <div className="header">{obj.Name}</div>
            <div className="content">{obj.Email}</div>
            <div className="content">{obj.role}</div>
          </div>
          <div className="last-login-wrapper">{obj["last-login"]}</div>
        </div>
      );
    });
    return items;
  }
  addProfileActions = (obtainedProfile,mode,id) => {
    if(mode === 'create') {
    let id = Math.max(
      ...this.props.userProfiles.map(function(o) {
        return o.id;
      }))
    this.props.addProfileData({
      id: id+1,
      ...obtainedProfile
    })} else 
    {
      this.props.updateProfileData(
        {id: id,
      ...obtainedProfile}
      );
    }

  };
  removeProfile = profile => {
    if(Object.keys(profile).length !== 0){
      let r = window.confirm(this.props.t('profile.confirm_delete'));
      if (r === true) {
        this.props.deleteProfile(profile)
      }
    } else{
      window.alert(this.props.t('profile.select_profile'))
    }
    
  }

  addNewProfile = () =>{
    this.setState({mode:'create',selectedProfile:{}})
  }
  render() {
    const { t } = this.props;
    let profileList = this.buildProfileList();
    return (
      <div className="user-profile-wrapper container">
        <div className="profile_list_wrapper">
          <div className="add-profile">
            <div onClick={this.addNewProfile}>
              <FaPlus color="white" /> &nbsp; {t('profile.new_profile')}
            </div>
            <div onClick={() => this.removeProfile(this.state.selectedProfile)}>
              <FaTrash />
            </div>
          </div>
          <div className="profile-header">
            <div> </div>
            <div> {t('profile.name')}</div>
            <div>{t('profile.last_login')}</div>
          </div>
          {profileList}
        </div>

        <div className="profile-details-wrapper">
          <ProfileDetails
            userDetails={this.state.selectedProfile}
            mode={this.state.mode}
            addProfileActions={this.addProfileActions}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userProfiles: state.profileData
  };
};


  const mapDispatchToProps = dispatch => {
    return {
      addProfileData: (profile) => dispatch(addProfile(profile)),
      updateProfileData: (profile) => dispatch(updateProfile(profile)),
      deleteProfile: (profile) => dispatch(deleteProfile(profile))
    }
  }

export default compose(withTranslation('common'), connect(
  mapStateToProps,
  mapDispatchToProps
))(Profiles);

