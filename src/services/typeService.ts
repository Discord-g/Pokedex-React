import api from "./api";
import type { typeModel } from "../models/type";

const getTypeData = async (id: string):Promise<typeModel | null> => {
    const { data } = await api.get(`/type/${id}`)
    return data;
}

export default {
    getTypeData
}