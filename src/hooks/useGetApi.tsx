import {useEffect, useState} from "react";
import {getApi} from "@/api/api";

export function useGetApi<T>(path: string) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<T | null>();

    useEffect(() => {
        getApi<T>(path).then((data) => {
            if (data) setData(data)
            setLoading(false);
        })
    }, [])

    return {loading, data}
}