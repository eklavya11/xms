import React from "react";
import "../styles/misc/handle.scss";
import CloseButton from "./closeButton";
import App from "../core/app";

export default class Handle extends React.Component {
	public render(): JSX.Element {
		return (
			<div className="handle">
				<div className="title">XMS by Atlas</div>
				<div className="buttons">
					{App.devMode &&
						<div className="dev-mode">Dev. Mode</div>
					}
					<div className="button-wrapper">
						<CloseButton className="button" />
					</div>
				</div>
			</div>
		);
	}
}
