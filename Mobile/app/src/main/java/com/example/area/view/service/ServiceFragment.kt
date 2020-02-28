package com.example.area.view.service

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProviders
import com.example.area.R

class ServiceFragment : Fragment()
{
    private lateinit var serviceViewModel: ServiceViewModel

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        serviceViewModel =
            ViewModelProviders.of(this).get(ServiceViewModel::class.java)
        val root = inflater.inflate(R.layout.service , container, false)
        return root
    }
}