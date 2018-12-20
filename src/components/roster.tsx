import React from "react";
import {connect} from "react-redux";
import "../styles/roster.scss";
import {AppState} from "../store/store";
import {IRoosterCategory, User} from "../types/types";
import RosterCategory from "./roster-category";

class Roster extends React.Component<any> {
	public renderCategories(): JSX.Element[] {
		return this.props.categories.map((category: IRoosterCategory) => {
			console.log(category);			

			const users: User[] = this.props.users.filter((user: User) => {
				return category.users.includes(user.id);
			});

			// TODO: Hard-coded meId for redux connect
			return <RosterCategory meId={null as any} key={category.id} title={category.name} users={users} />
		});
	}

	public render(): JSX.Element {
		return (
			<div className="rooster">
				{this.renderCategories()}
			</div>
		);
	}
}

const mapStateToProps = (state: AppState): any => {
    return {
		users: state.users,
		categories: state.categories
    };
};

export default connect(mapStateToProps)(Roster);