package com.example.area.data

import com.google.gson.annotations.SerializedName

data class ApiResponse<T>(
    @SerializedName("data") var data: T?=null,
    @SerializedName("success") var success : Boolean = false,
    @SerializedName("status") var status : Int = 0
)