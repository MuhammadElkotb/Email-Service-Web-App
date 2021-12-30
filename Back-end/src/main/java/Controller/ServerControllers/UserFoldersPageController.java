package Controller.ServerControllers;

import Controller.EmailsFilter.EmailsCriteriaI;
import Controller.EmailsFilter.EmailsFilteringCustomizedCriteria;
import Controller.Profile.Elements.Email.Email;
import Controller.Profile.Elements.Email.EmailI;
import Controller.Profile.Elements.ProfileFolderI;
import Controller.SingletonClasses.Creator;
import Controller.SingletonClasses.Database;
import Controller.SingletonClasses.Deleter;
import Controller.SingletonClasses.Handlers.FirstHandler;
import Controller.Sorter.EmailsSorter;
import Controller.Sorter.EmailsSorterI;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;

import javax.xml.crypto.Data;
import java.util.ArrayList;
import java.util.UUID;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class UserFoldersPageController {

    @GetMapping("/getFolder")
    ArrayList<EmailI> getFolder(@RequestParam(value = "username") String username, @RequestParam(value = "foldername") String folderName){
        try{
            EmailsSorterI emailsSorter = new EmailsSorter(false);
            return emailsSorter.sort(Database.getInstance().getProfilebyUsername("", username).getProfileFolderbyName(folderName).getEmails(), "date");
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }
    @GetMapping("/getFolders")
    ArrayList<ProfileFolderI> getAllFolders(@RequestParam(value = "username") String username){
        try{
            return Database.getInstance().getProfilebyUsername("", username).getFolders();
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }

    @PostMapping("/addFolder")
    ArrayList<ProfileFolderI> addUserFolder(@RequestParam("username") String username, @RequestBody String folderName){

        try{
            Creator.getInstance().createProfileFolder(folderName, Database.getInstance().getProfilebyUsername("", username));
            return Database.getInstance().getProfilebyUsername("", username).getFolders();
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }

    @DeleteMapping("/removeUserFolder")
    String removeUserFolder(@RequestParam("username") String username, @RequestParam(value = "foldername") String foldername){
        try{
            Deleter.getInstance().deleteProfileFolder(Database.getInstance().getProfilebyUsername("", username), foldername);
            return "REMOVED FOLDER SUCCESSFULLY";
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return e.getMessage();
        }
    }
    @PostMapping("/moveToFolder")
    String moveToFolder(@RequestBody Email email, @RequestParam(value = "username") String username, @RequestParam(value = "foldername") String folderName){
        try{
            FirstHandler.getInstance().handle("MoveToFolder", email, folderName);
            return "MOVED TO FOLDER SUCCESSFULLY";
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return e.getMessage();
        }
    }
    @PostMapping("/moveToTrash")
    ArrayList<EmailI> movetoTrash(@RequestBody Email email, @RequestParam(value = "foldername") String folderName){
        try{
            FirstHandler.getInstance().handle("MovetoTrash",email, "");
            return Database.getInstance().getProfilebyUsername("", email.getOwner()).getProfileFolderbyName(folderName).getEmails();
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }

    @GetMapping("/sortFolder")
    ArrayList<EmailI> sortFolder(@RequestParam(value = "username") String username, @RequestParam(value = "foldername") String folderName, @RequestParam(value = "target") String target, @RequestParam(value = "ascending") String ascending){
        try{
            Database database = Database.getInstance();
            EmailsSorterI sorter = new EmailsSorter(Boolean.parseBoolean(ascending));
            return sorter.sort(database.getProfilebyUsername("", username).getProfileFolderbyName(folderName).getEmails(), target);
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }

    @GetMapping("/filterFolder")
    ArrayList<EmailI> filterFolder(@RequestParam(value = "username") String username, @RequestParam(value = "foldername") String folderName, @RequestParam(value = "target") String target, @RequestParam(value = "feature") String feature){
        try{
            Database database = Database.getInstance();
            EmailsCriteriaI filter = new EmailsFilteringCustomizedCriteria(feature, target);
            return filter.meetCriteria(database.getProfilebyUsername("", username).getProfileFolderbyName(folderName).getEmails());
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }

}
