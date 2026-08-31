import { useEffect, useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';

import styles from './ArticleParamsForm.module.scss';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

type ArticleParamsProps = {
	//formRef?: React.RefObject<HTMLElement> | React.RefCallback<HTMLElement>;
	state: ArticleStateType;
	applyStyle: (e: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [state, setState] = useState(props.state);
	const paramsRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const handleMouseDown = (e: MouseEvent) => {
			if (
				!(paramsRef.current && paramsRef.current.contains(e.target as Node))
			) {
				setIsOpen(false);
			}
		};
		if (isOpen) {
			document.addEventListener('mousedown', handleMouseDown);
			return () => document.removeEventListener('mousedown', handleMouseDown);
		}
	}, [isOpen]);

	const handleOnChange = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setState((prevState) => ({ ...prevState, [field]: value }));
		};
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />
			<aside
				ref={paramsRef}
				className={isOpen ? styles.container_open : styles.container}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
					}}>
					<Text size={31} weight={800} uppercase>
						задайте параметры
					</Text>
					<Select
						title={'шрифт'}
						selected={state.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleOnChange('fontFamilyOption')}
					/>
					<RadioGroup
						options={fontSizeOptions}
						name='fontSize'
						selected={state.fontSizeOption}
						onChange={(e) => {
							setState((prevState) => ({
								...prevState,
								fontSizeOption: e,
							}));
						}}
						title='размер шрифта'
					/>
					<Select
						title={'цвет шрифта'}
						selected={state.fontColor}
						options={fontColors}
						onChange={handleOnChange('fontColor')}
					/>
					<Separator />
					<Select
						title={'цвет фона'}
						selected={state.backgroundColor}
						options={backgroundColors}
						onChange={handleOnChange('backgroundColor')}
					/>
					<Select
						title={'ширина контента'}
						selected={state.contentWidth}
						options={contentWidthArr}
						onChange={handleOnChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => {
								setState(defaultArticleState);
								props.applyStyle(defaultArticleState);
							}}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={() => {
								props.applyStyle(state);
							}}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
