/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { userFormMetaData } from "./data";
import { FormGroup, Label, Input, Col } from "reactstrap";
import {
  FaPen,
  FaCheckCircle,
  FaTimesCircle,
  FaChevronDown,
  FaChevronUp,
  FaGlobeAmericas,
  FaUserAlt
} from "react-icons/fa";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Accordion, Card } from "react-bootstrap";

const defaultAnswers = {
  Title: "Mr",
  Name: "",
  Surname: "",
  "Phone number": "",
  Department: "",
  Email: "",
  Client: "C1",
  Language: "English",
  Timezone: "UTC"
};
class ProfileDetails extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    userDetails: PropTypes.array.isRequired,
    mode:  PropTypes.string.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      userDetails: props.userDetails,
      mode: props.mode,
      answers: defaultAnswers,
      updateAnswers: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.mode !== "edit" ||
      nextProps.userDetails.id !== prevState.userDetails.id
    ) {
      return {
        userDetails: nextProps.userDetails,
        mode: nextProps.mode,
        updateAnswers: true
      };
    }
  }
  buildAnswers = () => {
    if (this.state.mode === "show" || this.state.mode === "edit") {
      let answers = defaultAnswers;
      let keys = Object.keys(answers);
      keys.forEach(val => {
        answers[val] = this.state.userDetails[val];
      });
      this.setState({ updateAnswers: true, answers });
    }
  };
  handleInputChange = (event, obj) => {
    let answers = this.state.answers;
    answers[obj.label] = event.target.value;
    this.setState({ answers, updateAnswers: false });
  };

  handleDropDownChange = (event, obj) => {
    let answers = this.state.answers;
    answers[obj.label] = event.target.value;
    this.setState({ answers, updateAnswers: false });
  };

  getFormInput = obj => {
    let renderProfile = {};
    renderProfile =
      this.state.mode === "create"
        ? this.props.userDetails
        : this.state.answers;
    if (obj.type === "text") {
      return (
        <FormGroup row>
          <Label for={obj.label} sm={2}>
            {obj.label}
          </Label>
          <Col sm={10}>
            {this.state.mode === "show" ? (
              <div className="user-values">{renderProfile[obj.label]}</div>
            ) : (
              <Input
                type="text"
                name={obj.label}
                id={obj.id}
                placeholder={obj.placeHolder}
                defaultValue={renderProfile[obj.label]}
                onChange={e => this.handleInputChange(e, obj)}
              />
            )}
          </Col>
        </FormGroup>
      );
    } else if (obj.type === "dropdown") {
      let values = obj.values.map(val => <option>{val}</option>);
      return (
        <FormGroup row>
          <Label for={obj.label} sm={2}>
            {obj.label}
          </Label>
          <Col sm={10}>
            {this.state.mode === "show" ? (
              <div className="user-values">{renderProfile[obj.label]}</div>
            ) : (
              <Input
                type="select"
                name={obj.label}
                id={obj.id}
                onChange={e => this.handleDropDownChange(e, obj)}
                defaultValue={renderProfile[obj.label]}
              >
                {values}
              </Input>
            )}
          </Col>
        </FormGroup>
      );
    } else {
      return (
        <FormGroup row>
          <Label for={obj.label} sm={2}>
            {obj.label}
          </Label>
          <Col sm={10}>
            {this.state.mode === "show" ? (
              <div className="user-values">{renderProfile[obj.label]}</div>
            ) : (
              <Input
                type="number"
                name={obj.label}
                id={obj.id}
                placeholder={obj.placeHolder}
                defaultValue={parseInt(renderProfile[obj.label])}
                onChange={e => this.handleInputChange(e, obj)}
              />
            )}
          </Col>
        </FormGroup>
      );
    }
  };

  buildUserProfile = () => {
    let items = userFormMetaData.map(obj => {
      if (obj.category === "basic") {
        return this.getFormInput(obj);
      }
    });
    return items;
  };

  handleCancel = () =>{
    this.setState({'mode':'show'})
  }
  buildAccordian = type => {
    let headerInfo =
      type === "company"
        ? this.props.t("profile.company_and_contact")
        : this.props.t("profile.language_and_region");
    let items = userFormMetaData.map(obj => {
      if (obj.category === type) {
        return this.getFormInput(obj);
      }
    });
    let accordian = (
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            <div className="accrodian-header">
              <h4>
                {type === "company" ? (
                  <FaUserAlt size={24} />
                ) : (
                  <FaGlobeAmericas size={24} />
                )}{" "}
                &nbsp;{headerInfo}
              </h4>
              <div className="action-icon">
                <FaChevronDown />
              </div>
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>{items}</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
    return accordian;
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.userDetails.id !== this.state.userDetails.id) {
      return true;
    }
    if (nextState.mode !== this.state.mode) {
      return true;
    }
    return false;
  }

  updateView = () => {
    this.setState({ mode: "edit" });
  };
  
  profileAction = () => {
    this.props.addProfileActions(
      this.state.answers,
      this.state.mode,
      this.state.userDetails["id"]
    );
    this.setState({ mode: "view" });
  };

  render() {
    const { t } = this.props;
    this.state.updateAnswers && this.buildAnswers();
    let userProfile = this.buildUserProfile();
    let userDetails = this.state.userDetails;
    let companyAccordian = this.buildAccordian("company");
    let languageAccordian = this.buildAccordian("language");
    return (
      <div className="container profile-details-wrapper">
        <div className="user-header-action">
          <div className="user-name-details">
            {this.props.mode === "create" ? (
              <h3>{t("profile.name")}</h3>
            ) : (
              <React.Fragment>
                <h3>{userDetails.Name}</h3>
                <h5>{userDetails.Email}</h5>
              </React.Fragment>
            )}
          </div>
          <div className="user-operations">
            {this.state.mode === "show" ? (
              <div onClick={this.updateView}>
                <FaPen size={32} />
              </div>
            ) : (
              <React.Fragment>
                <span onClick={this.handleCancel}><FaTimesCircle size={32} /></span>
                <div onClick={this.profileAction}>
                  <FaCheckCircle size={32} />
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
        <div className="user-basic-info">
          <div className="avatar">
            <img
              src="https://cdn.pixabay.com/photo/2012/04/13/21/07/user-33638__340.png"
              alt="image missing"
            />
          </div>
          <div className="details">{userProfile}</div>
        </div>
        <div>
          {companyAccordian}
          {languageAccordian}
        </div>
      </div>
    );
  }
}
export default withTranslation("common")(ProfileDetails);
