import { useContext, useState } from "react";
import { useToast } from "../../core/hooks";
import { AuthContext } from "../../auth/context/AuthContext";
import type { MembershipPayment } from "../interfaces";
import { adquireMemberSmart, adquireMemberVip } from "../apis/Api";

export const useMembership = () => {

    const { loadUser } = useContext(AuthContext);
    const { showToast } = useToast();
    const [adquiringMemberVip, setAdquiringMemberVip] = useState(false);
    const [adquiringMemberSmart, setAdquiringMemberSmart] = useState(false);
    const [loadingPayments, setLoadingPayments] = useState(false);
    const [payments, setPayments] = useState<MembershipPayment[]>([]);

    const adquireVip = async () => {
        setAdquiringMemberVip(true);

        try {
            await adquireMemberVip();
            await loadUser();
            await loadPayments();
            setAdquiringMemberVip(false);
            showToast('Éxito', 'Has adquirido la membresía VIP', 'success');

        } catch (e: any) {
            showToast('Error', e, 'error');
            setAdquiringMemberVip(false);
        }
    };

    const adquireSmart = async () => {
        setAdquiringMemberSmart(true);

        try {
            await adquireMemberSmart();
            await loadUser();
            await loadPayments();
            setAdquiringMemberSmart(false);
            showToast('Éxito', 'Has adquirido la membresía SMART', 'success');

        } catch (e: any) {
            showToast('Error', e, 'error');
            setAdquiringMemberSmart(false);
        }
    };

    const loadPayments = async () => {
        setLoadingPayments(true);

        try {
            // const resp: any = await getMyMembershipPayments();
            // setPayments(resp);
            setPayments(
                [
                    {
                        "_id": "681942273029214694742874",
                        "user": "681938db0f112d3e5f636735",
                        "amount": {
                            "$numberDecimal": "200"
                        },
                        "previous_balance": {
                            "$numberDecimal": "210"
                        },
                        "new_balance": {
                            "$numberDecimal": "10.0000000000000000"
                        },
                        "membership": "SMART",
                        "createdAt": "2025-05-05T22:56:39.174Z",
                        "updatedAt": "2025-05-05T22:56:39.174Z"
                    },
                    {
                        "_id": "681942a83029214694742883",
                        "user": "681938db0f112d3e5f636735",
                        "amount": {
                        "$numberDecimal": "1000"
                        },
                        "previous_balance": {
                        "$numberDecimal": "1100.0000000000000000"
                        },
                        "new_balance": {
                        "$numberDecimal": "100.0000000000000000"
                        },
                        "membership": "VIP",
                        "createdAt": "2025-05-05T22:58:48.944Z",
                        "updatedAt": "2025-05-05T22:58:48.944Z"
                    }
                ]
            )
            setLoadingPayments(false);

        } catch (e: any) {
            showToast('Error', e, 'error');
            setLoadingPayments(false);
        }
    };


    return {
        adquireVip,
        adquireSmart,
        adquiringMemberVip,
        adquiringMemberSmart,
        loadPayments,
        loadingPayments,
        payments
    }
}