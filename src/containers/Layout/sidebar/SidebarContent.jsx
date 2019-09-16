import React, { Component } from "react";
import PropTypes from "prop-types";
import SidebarLink from "./SidebarLink";
import SidebarCategory from "./SidebarCategory";
import { withTranslation } from "react-i18next";
class SidebarContent extends Component {
  static propTypes = {
    changeToDark: PropTypes.func.isRequired,
    changeToLight: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
  };

  hideSidebar = () => {
    const { onClick } = this.props;
    onClick();
  };

  render() {
    const { changeToLight, changeToDark, t } = this.props;

    return (
      <div className="sidebar__content">
        <ul className="sidebar__block">
          <SidebarLink
            title={t("dashboard.profile")}
            icon="user"
            route="/profiles"
            onClick={this.hideSidebar}
          />
          <SidebarLink
            title={t("dashboard.dashboard")}
            icon="home"
            route="/dashboard_default"
            onClick={this.hideSidebar}
          />

          <SidebarLink
            title={t("dashboard.notification")}
            icon="store"
            route="/dashboard_e_commerce"
            onClick={this.hideSidebar}
          />
          <SidebarLink
            title={t("dashboard.tags")}
            icon="heart-pulse"
            route="/dashboard_fitness"
            onClick={this.hideSidebar}
          />
          <SidebarLink
            title={t("dashboard.profile_templates")}
            icon="rocket"
            route="/dashboard_crypto"
            onClick={this.hideSidebar}
          />
          <SidebarLink
            title={t("dashboard.zone")}
            icon="apartment"
            
            route="/dashboard_booking"
            onClick={this.hideSidebar}
          />
          <SidebarLink
            title={t("dashboard.floorplans")}
            icon="smartphone"
            
            route="/dashboard_mobile_app"
            onClick={this.hideSidebar}
          />
          <SidebarLink
            title={t("dashboard.processes")}
            icon="envelope"
            route="/mail"
            onClick={this.hideSidebar}
          />
          <SidebarLink
            title={t("dashboard.group_plans")}
            icon="bubble"
            route="/chat"
            onClick={this.hideSidebar}
          />
          <SidebarLink
            title={t("dashboard.finder")}
            icon="book"
            
            route="/todo"
            onClick={this.hideSidebar}
          />
          <SidebarLink
            title={t("dashboard.reports")}
            icon="envelope"
            route="/mail"
            onClick={this.hideSidebar}
          />
          <SidebarLink
            title={t("dashboard.jobs")}
            icon="bubble"
            route="/chat"
            onClick={this.hideSidebar}
          />
          <SidebarLink
            title={t("dashboard.clients")}
            icon="book"
            
            route="/todo"
            onClick={this.hideSidebar}
          />
          <SidebarLink
            title={t("dashboard.firmware")}
            icon="book"
            
            route="/todo"
            onClick={this.hideSidebar}
          />

          <SidebarLink
            title={t("dashboard.monitoring")}
            icon="book"
            
            route="/todo"
            onClick={this.hideSidebar}
          />
        </ul>
        <ul className="sidebar__block">
          <SidebarLink title="Log Out" icon="exit" route="/log_in" />
        </ul>
      </div>
    );
  }
}

export default withTranslation("common")(SidebarContent);
