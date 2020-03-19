package com.example.area.view.service

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.example.area.R
import com.google.gson.annotations.SerializedName
import kotlinx.android.synthetic.main.service.*
import kotlinx.android.synthetic.main.service_reaction.*
import org.json.JSONArray
import org.json.JSONObject

class Service_Reaction : AppCompatActivity() {

    data class Param @JvmOverloads constructor(
        @SerializedName("name")
        var name: String? = null,
        @SerializedName("value")
        var value: String? = null)
    data class Reactions @JvmOverloads constructor(
        @SerializedName("service")
        var service: String? = null,
        @SerializedName("name")
        var name: String? = null,
        @SerializedName("params")
        var params: Param? = null
    )

    private lateinit var baseUrl :String
    private lateinit var _buttonIssueGithub : Button
    private lateinit var _buttonsendToGmail : Button
    private lateinit var _buttonsendToZoho : Button
    private lateinit var _buttonMessageDiscord : Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.service_reaction)
        baseUrl = this?.intent?.getStringExtra("baseUrl")!!
        //var Actions = this?.intent?.getStringArrayExtra("Action")

        var Reactions = Reactions()
        val jsonobj = JSONObject()
        var jsonArrayAction = JSONArray()
        var jsonArrayReaction = JSONArray()
        val transferReaction = JSONObject()
        val transferAction = JSONObject()
        val url = "$baseUrl/area/new"
        var message : String

        _buttonIssueGithub = findViewById(R.id.sendButtonGithub)
        _buttonsendToGmail = findViewById(R.id.sendButtonGmail)
        _buttonsendToZoho = findViewById(R.id.sendButtonZoho)
        _buttonMessageDiscord = findViewById(R.id.sendButtonDiscord)

        //gTodo : Comme pour les actions, bien récupérer les réactions et les envoyer au serveur afin qu'il puisse les créer

        _buttonIssueGithub.setOnClickListener {
            val GithubService: String = GithubTView.text.toString().toLowerCase()
            var GithubNameIssue : String = ReactionIssueGithub.text.toString()
            val ParamOwner = GithubReactionOwner.text.toString()
            val ParamRepo = GithubReactionrepo.text.toString()

            Reactions.service = GithubService
            Reactions.name = GithubNameIssue
            Reactions.params = Param(ParamOwner, "String")
            Reactions.params = Param(ParamRepo, "String")

            transferAction.put("Service", "Tarte ACTION")
            transferAction.put("Sname", "Tarte ACTION")
            transferAction.put("params", "Tarte ACTION")

            jsonArrayAction.put(transferAction)
            jsonobj.put("Action", jsonArrayAction)

            transferReaction.put("service",Reactions.service)
            transferReaction.put("name",Reactions.name)
            transferReaction.put("params", Reactions.params)

            jsonArrayReaction.put(transferReaction)
            jsonobj.put("Reaction", jsonArrayReaction)

            jsonArrayAction = JSONArray()
            jsonArrayReaction = JSONArray()

            message = jsonobj.toString()
            println(message)

            val que = Volley.newRequestQueue(this)
            val req = JsonObjectRequest(
                Request.Method.POST, url, jsonobj,
                Response.Listener {
                        response ->
                    Toast.makeText(this, "Actions send", Toast.LENGTH_SHORT).show()

                }, Response.ErrorListener {
                    Toast.makeText(this, url, Toast.LENGTH_SHORT).show()
               })
            que.add(req)
        }

        _buttonsendToGmail.setOnClickListener {
            val GmailService: String = GmailTView.text.toString().toLowerCase()
            var GmailNamesendTo : String = ReactionSendToGmail.text.toString()
            val ParamDest = GmailReactionDest.text.toString()
            val ParamSubject = GmailReactionSubject.text.toString()

            Reactions.service = GmailService
            Reactions.name = GmailNamesendTo
            Reactions.params = Param(ParamDest, "email")
            Reactions.params = Param(ParamSubject, "String")

            val que = Volley.newRequestQueue(this)
            val req = JsonObjectRequest(
                Request.Method.POST, url, jsonobj,
                Response.Listener {
                        response ->
                    Toast.makeText(this, "Actions send", Toast.LENGTH_SHORT).show()

                }, Response.ErrorListener {
                    Toast.makeText(this, url, Toast.LENGTH_SHORT).show()
                })
            que.add(req)

        }

        _buttonsendToZoho.setOnClickListener {
            val ZohoService: String = ZohoTView.text.toString().toLowerCase()
            var ZohoNamesendTo : String = ReactionSendtToZoho.text.toString()
            val ParamDest = ReactionDestZoho.text.toString()
            val ParamSubject = ReactionSubjectZoho.text.toString()

            Reactions.service = ZohoService
            Reactions.name = ZohoNamesendTo
            Reactions.params = Param(ParamDest, "email")
            Reactions.params = Param(ParamSubject, "String")

            val que = Volley.newRequestQueue(this)
            val req = JsonObjectRequest(
                Request.Method.POST, url, jsonobj,
                Response.Listener {
                        response ->
                    Toast.makeText(this, "Actions send", Toast.LENGTH_SHORT).show()

                }, Response.ErrorListener {
                    Toast.makeText(this, url, Toast.LENGTH_SHORT).show()
                })
            que.add(req)

        }

        _buttonMessageDiscord.setOnClickListener {
            val DiscordService: String = DiscordTView.text.toString().toLowerCase()
            var DiscordNameMessage : String = ReactionMessageDiscord.text.toString()
            val ParamWebhookId = DiscordReactionwebhookid.text.toString()
            val ParamWebhooktoken = DiscordReactionWebhooktoken.text.toString()

            Reactions.service = DiscordService
            Reactions.name = DiscordNameMessage
            Reactions.params = Param(ParamWebhookId, "String")
            Reactions.params = Param(ParamWebhooktoken, "String")

            val que = Volley.newRequestQueue(this)
            val req = JsonObjectRequest(
                Request.Method.POST, url, jsonobj,
                Response.Listener {
                        response ->
                    Toast.makeText(this, "Actions send", Toast.LENGTH_SHORT).show()

                }, Response.ErrorListener {
                    Toast.makeText(this, url, Toast.LENGTH_SHORT).show()
                })
            que.add(req)

        }
        return
    }
}