import type {NextPage} from 'next';
import {signIn, useSession} from 'next-auth/client';

const SignIn: NextPage = () => {
	const [session] = useSession();

	return (
		<>
			<p>signed in as {session?.user?.name}</p>
			<button onClick={() => signIn()}>Sign In</button>
		</>
	);
};

export default SignIn;
