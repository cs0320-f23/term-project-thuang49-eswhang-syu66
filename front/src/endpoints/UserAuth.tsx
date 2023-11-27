

export function UserAuth() {

    function authHandle() {

        const redirect: string = 'http://localhost:3000/auth'
        return redirect
    }

    return (
        <a href = {authHandle()}>
            <button onClick={authHandle}>
                Get Started
            </button>
        </a>
    )
}