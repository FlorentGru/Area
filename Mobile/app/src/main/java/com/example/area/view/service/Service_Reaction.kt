package com.example.area.view.service

import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import com.example.area.R
import com.google.gson.annotations.SerializedName
import kotlinx.android.synthetic.main.service.*
import kotlinx.android.synthetic.main.service_reaction.*

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

    private lateinit var _buttonIssueGithub : Button
    private lateinit var _buttonsendToGmail : Button
    private lateinit var _buttonsendToZoho : Button
    private lateinit var _buttonMessageDiscord : Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.service_reaction)
        var Reactions =
            Reactions()

        _buttonIssueGithub = findViewById(R.id.sendButtonGithub)
        _buttonsendToGmail = findViewById(R.id.sendButtonGmail)
        _buttonsendToZoho = findViewById(R.id.sendButtonZoho)
        _buttonMessageDiscord = findViewById(R.id.sendButtonDiscord)

        //Todo : Comme pour les actions, bien récupérer les réactions et les envoyer au serveur afin qu'il puisse les créer

        _buttonIssueGithub.setOnClickListener {
            val GithubService: String = GithubTView.text.toString()
            var GithubNameIssue : String = ReactionIssueGithub.text.toString()
            val ParamOwner = GithubReactionOwner.text.toString()
            val ParamRepo = GithubReactionrepo.text.toString()

            Reactions.service = GithubService
            Reactions.name = GithubNameIssue

        }

        _buttonsendToGmail.setOnClickListener {
            val GmailService: String = GmailTView.text.toString()
            var GmailNamesendTo : String = ReactionSendToGmail.text.toString()
            val ParamDest = GmailReactionDest.text.toString()
            val ParamSubject = GmailReactionSubject.text.toString()

            Reactions.service = GmailService
            Reactions.name = GmailNamesendTo

        }

        _buttonsendToZoho.setOnClickListener {
            val ZohoService: String = ZohoTView.text.toString()
            var ZohoNamesendTo : String = ReactionSendtToZoho.text.toString()
            val ParamDest = ReactionDestZoho.text.toString()
            val ParamSubject = ReactionSubjectZoho.text.toString()

            Reactions.service = ZohoService
            Reactions.name = ZohoNamesendTo

        }

        _buttonMessageDiscord.setOnClickListener {
            val DiscordService: String = DiscordTView.text.toString()
            var DiscordNameMessage : String = ReactionMessageDiscord.text.toString()
            val ParamWebhookId = DiscordReactionwebhookid.text.toString()
            val ParamWebhooktoken = DiscordReactionWebhooktoken.text.toString()

            Reactions.service = DiscordService
            Reactions.name = DiscordNameMessage

        }
    }
}