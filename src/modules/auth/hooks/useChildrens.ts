import { useRef, useState } from "react";
import { useToast } from "../../core/hooks";
import { getChildrens } from "../api/Api";
import type { Children } from "../interfaces";

export const useChildrens = () => {

    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [childrens, setChildrens] = useState<Children[]>([]);
    const [page, setPage] = useState(1);
    const [canLoadMore, setCanLoadMore] = useState(false);
    const limit = useRef(25).current;

    const loadChildrens = async (userId: string) => {
        setLoading(true);

        try {
            const resp: any = await getChildrens(userId, 1, limit);
            setChildrens(resp.childrens);
            setPage(resp.page_loaded);
            setCanLoadMore(resp.can_load_more);
            setLoading(false);

        } catch (e: any) {
            setLoading(false);
            showToast('Error', e, 'error');
        }
    };

    const loadMoreChildrens = async (userId: string) => {
        if (!canLoadMore || loading) return;
        setLoading(true);

        try {
            const resp: any = await getChildrens(userId, page + 1, limit);
            setChildrens(current => [...current, ...resp.childrens]);
            setPage(resp.page_loaded);
            setCanLoadMore(resp.can_load_more);
            setLoading(false);

        } catch (e: any) {
            setLoading(false);
            showToast('Error', e, 'error');
        }
    };

    return {
        loadChildrens,
        loadMoreChildrens,
        loading,
        childrens,
        canLoadMore
    }
}