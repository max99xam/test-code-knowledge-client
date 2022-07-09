import React from 'react';
import { withLayout } from 'layouts/MainLayout';
import { QuestionsList } from 'components';
import { useGetQuestionsQuery } from 'store/questions.api';
import { useRouter } from 'next/router';

const AdminPage = () => {
	const router = useRouter();
	const { technology } = router.query;

	const { data: questions = [], isLoading } = useGetQuestionsQuery({
		technology,
		limit: '',
	});

	if (isLoading) return <h1>Loading...</h1>;

	return (
		<>
			<QuestionsList withEdit={true} questions={questions} />
		</>
	);
};

export default withLayout(AdminPage);