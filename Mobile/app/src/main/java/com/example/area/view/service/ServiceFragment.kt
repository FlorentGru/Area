package com.example.area.view.service

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.Toast
import androidx.fragment.app.Fragment
import com.example.area.R
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
        var params: Param? = null
    )

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

        _buttonPushGithub = _view!!.findViewById(R.id.sendPushGithub)
        _buttonPullrequestGithub = _view!!.findViewById(R.id.sendPullRequestGithub)
        _buttonDeletedDropbox = _view!!.findViewById(R.id.sendDeletedButtonDropbox)
        _buttonCreatedDropbox= _view!!.findViewById(R.id.sendCreateddButtonDropbox)
        _buttonRenamedDropbox =_view!!.findViewById(R.id.sendRenameddButtonDropbox)
        _buttonPathchangedDropbox =_view!!.findViewById(R.id.sendPathChangedButtonDropbox)
        _buttonMessageDiscord = _view!!.findViewById(R.id.sendMessageDiscord)
        _buttonCountdownTimer =_view!!.findViewById(R.id.sendCountDownButtonTimer)
        _buttonLoopTimer =_view!!.findViewById(R.id.sendLoopButtonTimer)

        //Todo : Envoyer au serveur les actions avec ce qui à été récupérer en dessous et stocker dans la data class Actions


        _buttonPushGithub.setOnClickListener {
            val GithubService: String = ActionGithubTView.text.toString()
            var GithubNamePush : String = ActionPushGithub.text.toString()
            val ParamOwner: String = PushOwnerGithub.text.toString()
            val ParamRepo: String = PushRepoGithub.text.toString()

            Action.service = GithubService
            Action.name = GithubNamePush
            Action.params = Param(ParamOwner, "String")
            Action.params = Param(ParamRepo, "String")
            Toast.makeText(activity, GithubService + GithubNamePush, Toast.LENGTH_SHORT).show()

        }

        _buttonPullrequestGithub.setOnClickListener {
            val GithubService: String = ActionGithubTView.text.toString()
            val GithubNamePullrequest: String = ActionPullRequestGithub.text.toString()
            val ParamRepo: String = PullRequestRepoGithub.text.toString()
            val ParamOwner: String = PullRequestOwnerGithub.text.toString()

            Action.service = GithubService
            Action.name = GithubNamePullrequest
            Action.params = Param(ParamOwner, "String")
            Action.params = Param(ParamRepo, "String")
            Toast.makeText(activity, GithubService, Toast.LENGTH_SHORT).show()
        }

        _buttonDeletedDropbox.setOnClickListener {
            val DropboxService: String = ActionDropboxTView.text.toString()
            val DropboxNameDeleted: String = ActionDeletedDropbox.text.toString()

            Action.service = DropboxService
            Action.service = DropboxNameDeleted
            Toast.makeText(activity, DropboxService, Toast.LENGTH_SHORT).show()
        }

        _buttonCreatedDropbox.setOnClickListener {
            val DropboxService: String = ActionDropboxTView.text.toString()
            val DropboxNameCreated: String = ActionCreatedDropbox.text.toString()

            Action.service = DropboxService
            Action.name = DropboxNameCreated
            Toast.makeText(activity, DropboxService, Toast.LENGTH_SHORT).show()
        }

        _buttonRenamedDropbox.setOnClickListener {
            val DropboxService: String = ActionDropboxTView.text.toString()
            val DropboxNameRenamed: String = ActionRenamedDropbox.text.toString()

            Action.service = DropboxService
            Action.name = DropboxNameRenamed
        }

        _buttonPathchangedDropbox.setOnClickListener {
            val DropboxService: String = ActionDropboxTView.text.toString()
            val DropboxNamePatchchanged: String = ActionPathChangedDropbox.text.toString()

            Action.service = DropboxService
            Action.name = DropboxNamePatchchanged
        }

        _buttonMessageDiscord.setOnClickListener {
            val DiscordService: String = ActionDiscordTView.text.toString()
            val DiscordNameMessage: String = ActionDiscordMessage.text.toString()
            val ParamServer: String = DiscordActionServer.text.toString()
            val ParamChannel: String = DiscordActionChannel.text.toString()
            val ParamTrigger: String = DiscordActionTrigger.text.toString()

            Action.service = DiscordService
            Action.name = DiscordNameMessage
            Action.params = Param(ParamServer, "String")
            Action.params = Param(ParamChannel, "String")
            Action.params = Param(ParamTrigger, "String")
            Toast.makeText(activity, "Discord Message", Toast.LENGTH_SHORT).show()
        }

        _buttonCountdownTimer.setOnClickListener {
            val TimerService: String = ActionTimerTView.text.toString()
            val TimerNameCountdown: String = ActionCountdownTimer.text.toString()
            val ParamHours: String = TimerCountDownActionHours.text.toString()
            val ParamMinutes: String = TimerCountDownActionMinutes.text.toString()
            val ParamMessage: String = TimerCountDownActionMessage.text.toString()

            Action.service = TimerService
            Action.name = TimerNameCountdown
            Action.params = Param(ParamHours, "integer")
            Action.params = Param(ParamMinutes, "integer")
            Action.params = Param(ParamMessage, "String")
            Toast.makeText(activity, "Count Timer", Toast.LENGTH_SHORT).show()
        }

        _buttonLoopTimer.setOnClickListener {
            val TimerService: String = ActionTimerTView.text.toString()
            val TimerNameLoop: String = ActionLoppTimer.text.toString()
            val ParamHours: String = TimerLoopActionHours.text.toString()
            val ParamMinutes: String = TimerLoopActionMinutes.text.toString()
            val ParamMessage: String = TimerLoopActionMessage.text.toString()

            Action.service = TimerService
            Action.name = TimerNameLoop
            Action.params = Param(ParamHours, "integer")
            Action.params = Param(ParamMinutes, "integer")
            Action.params = Param(ParamMessage, "String")
            Toast.makeText(activity, "Loop Timer", Toast.LENGTH_SHORT).show()
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