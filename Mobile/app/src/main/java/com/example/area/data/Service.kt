package com.example.area.data

import com.google.gson.annotations.SerializedName

data class Service(
    @SerializedName("urlWebView") var urlWebView: String = ""
)