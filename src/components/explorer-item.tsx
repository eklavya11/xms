import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "../styles/explorer-item.scss";
import {faQuestionCircle, IconDefinition} from "@fortawesome/free-regular-svg-icons";
import {faHashtag} from "@fortawesome/free-solid-svg-icons";

export enum ExplorerItemType {
    TextChannel
}

type ExplorerItemProps = {
    readonly name: string;
    readonly type: ExplorerItemType;
    readonly indicate: boolean;
    readonly active: boolean;
}

export default class ExplorerItem extends React.Component<ExplorerItemProps> {
    public getIcon(): IconDefinition {
        switch (this.props.type) {
            case ExplorerItemType.TextChannel: {
                return faHashtag;
            }
        }

        return faQuestionCircle;
    }

    public getComponentClass(): string {
        const classes: string[] = ["explorer-item"];

        if (this.props.indicate) {
            classes.push("indicate");
        }

        if (this.props.active) {
            classes.push("active");
        }

        return classes.join(" ");
    }

	public render() {
		return (
			<div className={this.getComponentClass()}>
                <FontAwesomeIcon className="icon" icon={this.getIcon()} />
                <div className="name">{this.props.name}</div>
                <div className="indicator" />
			</div>
		);
	}
}
