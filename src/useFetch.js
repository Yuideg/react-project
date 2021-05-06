import { useEffect, useState } from 'react'
const useFetch = (url) => {
    const [datas, setDatas] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortFetch = new AbortController();
        setTimeout(() => {
            fetch(url, { signal: abortFetch.signal })
                .then(res => {
                    if (!res.ok) {
                        throw Error("Could not found the resource end point!");
                    }
                    return res.json();
                })
                .then(data => {
                    // console.log(data);
                    setDatas(data);
                    setIsPending(false);
                    setError(null);
                })
                .catch((err) => {
                    if (err.name === 'AbortError') {
                        console.log("fetch aborted ");
                    } else {
                        setIsPending(false);
                        setError(err.message);
                    }
                })
        }, 1000)
        return () => abortFetch.abort();
    }, [url]);
    return { datas, isPending, error }


}
export default useFetch;