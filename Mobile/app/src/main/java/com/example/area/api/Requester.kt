package com.example.area.api

import com.example.area.data.ApiResponse
import com.example.area.data.Service
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Path

interface Requester {
    @GET("/oauth2/{service}")
    fun getWebView (
        @Path("service") section :String ="")
        : Call<ApiResponse<ArrayList<Service>>>
}