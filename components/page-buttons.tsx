import React from 'react';
import PageButton from './page-button';

type Props = {
	hasBack: boolean;
	onBack: () => void;
	hasNext: boolean;
	onNext: () => void;
};

export default function PageButtons({hasBack, onBack, hasNext, onNext}: Props) {
	return (
		<div className="flex justify-center my-2">
			<PageButton active={hasBack} onClick={onBack} className="rounded-l">
				Previous
			</PageButton>
			<PageButton active={hasNext} onClick={onNext} className="rounded-r">
				Next
			</PageButton>
		</div>
	);
}
