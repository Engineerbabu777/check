

import { getProviders, signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Login = ({ providers }) => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  if (session?.user) {
    router.push('/');
  }

  return (
    <div className="flex justify-center items-center h-screen">

      {Object?.values(providers).map((provider, id) => (
        <button onClick={async () => await signIn(provider.id)} key={id} className="bg-twitterWhite text-black text-[1rem] px-3 pl-2 py-1  min-w-[250px] rounded-full flex gap-1 justify-center items-center">
          <img src={"/google.png"} className="w-[3rem] h-[3rem]" alt={"google"} />
          <p className="font-semibold">Sign in with {provider.name}</p>
        </button>
      ))}

    </div>
  )
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();
  console.log(providers);
  return {
    props: { providers },
  }
}