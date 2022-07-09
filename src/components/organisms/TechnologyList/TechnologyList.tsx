import Image from 'next/image';
import styles from './TechnologyList.module.scss';
import { TechnologyListProps } from './TechnologyList.props';
import { useRouter } from 'next/router';
import { technologyList } from 'constants/technologies';
import { Button, Tag } from 'components';

export const TechnologyList = ({
	questionsListsSizes,
}: TechnologyListProps): JSX.Element => {
	const router = useRouter();

	const showQuestionsButtonHandler = (technology: string) => () => {
		router.push(`/questions/${technology}`);
	};

	const passTestButtonHandler = (technology: string) => () => {
		const technologyQuestionsAmount = questionsListsSizes[technology];
		const defaultQuestionsForTestSize = 5;

		const sizeInQuery =
			technologyQuestionsAmount < defaultQuestionsForTestSize
				? technologyQuestionsAmount
				: defaultQuestionsForTestSize;
		router.push(`/test/${technology}?questionsAmount=${sizeInQuery}`);
	};

	return (
		<div className={styles.wrapper}>
			{technologyList.map((technology) => {
				return (
					<div className={styles.card}>
						<h3 className={styles.cardTitle}>{technology.name}</h3>
						<Image
							className={styles.img}
							src={technology.src}
							alt={technology.name}
							width={280}
							height={280}
						/>
						<div className={styles.cardContainer}>
							<div className={styles.cardQuestionsInfo}>
								<Button
									onClick={showQuestionsButtonHandler(
										technology.name.toLowerCase()
									)}
									appearance="ghost"
								>
									Show questions
								</Button>
								<Tag size="lg" className={styles.cardTag} color="error">
									{questionsListsSizes[technology.name.toLowerCase()]}
								</Tag>
							</div>
							<Button
								onClick={passTestButtonHandler(technology.name.toLowerCase())}
								className={styles.cardButton}
								appearance="primary"
							>
								Pass the test
							</Button>
						</div>
					</div>
				);
			})}
		</div>
	);
};