import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../api/axios.js"
// import "./testStorage.js"

export const fetchMe = createAsyncThunk("auth/fetchMe", async (_, { rejectWithValues }) => {
    try {
        const res = await api.get("/auth/me")
        return res.data
    } catch (err) {
        return rejectWithValues(err.response?.data?.error || "Not Authenticated")
    }
})

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
    await api.post("/auth/logout")
})

const initialState = {
    user: null,
    role: null,
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload.user
            state.role = action.payload.role
            state.isAuthenticated = true
        },
        clearCredentials: (state) => {
            state.user = null
            state.role = null
            state.isAuthenticated = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMe.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.role = action.payload.role
                state.isAuthenticated = true
            })
            .addCase(fetchMe.rejected, (state) => {
                state.user = null
                state.role = null
                state.isAuthenticated = false
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null
                state.role = null
                state.isAuthenticated = false
            })
    }
})

export const { setCredentials, clearCredentials } = authSlice.actions
export default authSlice.reducer