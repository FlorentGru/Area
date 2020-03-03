package com.example.area.view.service

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProviders
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.example.area.R
import com.example.area.Service_Reaction
import kotlinx.android.synthetic.main.service.*
import com.google.gson.annotations.SerializedName

class ServiceFragment : Fragment() {

    data class Param @JvmOverloads constructor(
        @SerializedName ("name")
        var name: String? = null,
        @SerializedName("value")
        var value: String? = null)
    data class Actions @JvmOverloads constructor(
        @SerializedName ("service")
        var service: String? = null,
        @SerializedName ("name")
        var name: String? = null,
        @SerializedName ("params")
        var params: List<Param> = mutableListOf())

    private var _baseUrl = ""
    private var _view: View? = null
    private lateinit var _buttongmail : Button
    private lateinit var _buttonzoho : Button

    private lateinit var _buttonPushGithub : Button
    private lateinit var _buttonPullrequestGithub : Button
    private lateinit var _buttonDeletedDropbox : Button
    private lateinit var _buttonCreatedDropbox : Button
    private lateinit var _buttonRenamedDropbox : Button
    private lateinit var _buttonPathchangedDropbox : Button
    private lateinit var _buttonMessageDiscord : Button
    private lateinit var _buttonCountdownTimer : Button
    private lateinit var _buttonLoopTimer : Button

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _view = inflater.inflate(R.layout.service, container, false)
        var Action = Actions()

        //val DiscordService: String = ActionDiscordTView.text.toString()
        //val GithubService: String = ActionGithubTView.text.toString()
        //val GmailService: String = ActionGmailTView.text.toString()
        //val DropboxService: String = ActionDropboxTView.text.toString()
        //val ZohoService: String = ActionZohoTView.text.toString()
        //val TimerService: String = ActionTimerTView.text.toString()
        //val SlackService: String = ActionSlackTView.text.toString()

        //val DiscordNameMessage: String = ActionDiscordMessage.text.toString()
        //val GithubNamePush: String = ActionPushGithub.text.toString()
        //val GithubNamePullrequest: String = ActionPullRequestGithub.text.toString()
        //val TimerNameCountdown: String = ActionCountdownTimer.text.toString()
        //val TimerNameLoop: String = ActionLoppTimer.text.toString()
        //val DropboxNameDeleted: String = ActionDeletedDropbox.text.toString()
        //val DropboxNameCreated: String = ActionCreatedDropbox.text.toString()
        //val DropboxNameRenamed: String = ActionRenamedDropbox.text.toString()
        //val DropboxNamePatchchanged: String = ActionPathChangedDropbox.text.toString()


        _buttonPushGithub = _view!!.findViewById(R.id.sendPushGithub)
        _buttonPullrequestGithub = _view!!.findViewById(R.id.sendPullRequestGithub)
        _buttonDeletedDropbox = _view!!.findViewById(R.id.sendDeletedButtonDropbox)
        _buttonCreatedDropbox= _view!!.findViewById(R.id.sendCreateddButtonDropbox)
        _buttonRenamedDropbox =_view!!.findViewById(R.id.sendRenameddButtonDropbox)
        _buttonPathchangedDropbox =_view!!.findViewById(R.id.sendPathChangedButtonDropbox)
        _buttonMessageDiscord = _view!!.findViewById(R.id.sendMessageDiscord)
        _buttonCountdownTimer =_view!!.findViewById(R.id.sendCountDownButtonTimer)
        _buttonLoopTimer =_view!!.findViewById(R.id.sendLoopButtonTimer)


        _buttonPushGithub.setOnClickListener {
            val ParamOwner: String = PushOwnerGithub.text.toString()
            val ParamRepo: String = PushRepoGithub.text.toString()
            //Action.service = GithubService
            //Action.name = GithubNamePush
        }
        _buttonPullrequestGithub.setOnClickListener {
            val ParamRepo: String = PullRequestRepoGithub.text.toString()
            val ParamOwner: String = PullRequestOwnerGithub.text.toString()
            //Action.service = GithubService
            //Action.name = GithubNamePullrequest
        }
        _buttonDeletedDropbox.setOnClickListener {
            //Action.service = DropboxService
            //Action.service = DropboxNameDeleted
        }
        _buttonCreatedDropbox.setOnClickListener {
            //Action.service = DropboxService
            //Action.name = DropboxNameCreated
        }
        _buttonRenamedDropbox.setOnClickListener {
            //Action.service = DropboxService
            //Action.name = DropboxNameRenamed
        }
        _buttonPathchangedDropbox.setOnClickListener {
            //Action.service = DropboxService
            //Action.name = DropboxNamePatchchanged
        }
        _buttonMessageDiscord.setOnClickListener {
            val ParamServer: String = DiscordActionServer.text.toString()
            val ParamChannel: String = DiscordActionChannel.text.toString()
            val ParamTrigger: String = DiscordActionTrigger.text.toString()
            //Action.service = DiscordService
            //Action.name = DiscordNameMessage
        }
        _buttonCountdownTimer.setOnClickListener {
            val ParamHours: String = TimerCountDownActionHours.text.toString()
            val ParamMinutes: String = TimerCountDownActionMinutes.text.toString()
            val ParamMessage: String = TimerCountDownActionMessage.text.toString()
            //Action.service = TimerService
            //Action.name = TimerNameCountdown
        }
        _buttonLoopTimer.setOnClickListener {
            val ParamHours: String = TimerLoopActionHours.text.toString()
            val ParamMinutes: String = TimerLoopActionMinutes.text.toString()
            val ParamMessage: String = TimerLoopActionMessage.text.toString()
            //Action.service = TimerService
            //Action.name = TimerNameLoop
        }



        _buttongmail = _view!!.findViewById(R.id.sendButtonGmail)
        _buttonzoho = _view!!.findViewById(R.id.sendButtonZoho)
        _buttongmail.setOnClickListener {
            Toast.makeText(activity, "Move to Reaction", Toast.LENGTH_SHORT).show()
            val intent = Intent(activity, Service_Reaction::class.java)
            startActivity(intent)
        }
        _buttonzoho.setOnClickListener {
            Toast.makeText(activity, "Move to Reaction", Toast.LENGTH_SHORT).show()
            val intent = Intent(activity, Service_Reaction::class.java)
            startActivity(intent)
        }
        return _view
    }
}