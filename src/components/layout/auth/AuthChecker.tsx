import React from "react";
import useAuthCheck from "./useAuthCheck";
import Loading from "@/components/ui/Loading";

interface Props {
    children: React.ReactNode;
}

export default function AuthChecker({children}: Props) {
    const {user, loading} = useAuthCheck();

    if (loading) return (<Loading/>);
    return (<>{user && children}</>);
}
