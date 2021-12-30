package Controller.ServerControllers;

import Controller.Profile.Elements.Email.Attachment;
import Controller.Profile.Elements.Email.Email;
import Controller.Profile.Elements.Email.EmailI;
import Controller.SingletonClasses.Database;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;


import Controller.SingletonClasses.Handlers.FirstHandler;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class SendEmailPageController {


    @PostMapping("/sendEmail")
    String sendEmail(@RequestBody Email email){
        try{
            FirstHandler.getInstance().handle("SendEmail", email, "");
            return "SENT EMAIL SUCCESSFULLY";
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }

    @PostMapping("/sendEmailAttachments")
    void attachment(@RequestParam(value = "email") String email, @RequestParam("file") MultipartFile[] files) {
        try {
            ObjectMapper map = new ObjectMapper();
            EmailI newEmail = map.readValue(email, Email.class);
            newEmail.setAttachments(new ArrayList<Attachment>());
            if (files != null) {
                for (int i = 0; i < files.length; i++) {

                    Attachment attachment = new Attachment();
                    attachment.setEncoded(files[i].getBytes());
                    System.out.println(files[i].getOriginalFilename());
                    attachment.setName(files[i].getOriginalFilename());
                    System.out.println(files[i].getSize());

                    attachment.setType(files[i].getContentType());
                    newEmail.addAttachment(attachment);
                    System.out.println(attachment.getName());
                }
            }

            FirstHandler.getInstance().handle("SendEmail", newEmail, "");
        } catch (Exception e) {

            System.out.println(e.getMessage());
        }
    }



    @PostMapping("/movetoDraft")
    String movetoDraft(@RequestBody Email email){
        try {
            FirstHandler.getInstance().handle("MovetoDraft",email, "");
            return "MOVED TO DRAFT SUCCESSFULLY";

        }catch (Exception e){
            System.out.println(e.getMessage());
            return e.getMessage();
        }
    }
}
