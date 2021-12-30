package Controller.ServerControllers;

import Controller.EmailsFilter.EmailsCriteriaI;
import Controller.EmailsFilter.EmailsFilteringCustomizedCriteria;
import Controller.EmailsFilter.EmailsSearchingCustomizedCriteria;
import Controller.Profile.Elements.Email.Email;
import Controller.Profile.Elements.Email.EmailI;
import Controller.SingletonClasses.Database;
import Controller.SingletonClasses.Handlers.FifthHandler;
import Controller.SingletonClasses.Handlers.FirstHandler;
import Controller.Sorter.EmailsSorter;
import Controller.Sorter.EmailsSorterI;
import org.glassfish.hk2.runlevel.Sorter;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class DraftPageController {
    @PostMapping("/movetoTrashDraft")
    ArrayList<EmailI> movetoTrash(@RequestBody Email email){
        try{
            FirstHandler.getInstance().handle("MovetoTrash",email, "");
            return Database.getInstance().getProfilebyUsername("", email.getOwner()).getDraft().getEmails();
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }
    @GetMapping("/getDraft")
    ArrayList<EmailI> getDraft(@RequestParam(value = "username") String username){
        try{
            EmailsSorterI emailsSorter = new EmailsSorter(false);
            return emailsSorter.sort(Database.getInstance().getProfilebyUsername("", username).getDraft().getEmails(), "date");
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }

    @GetMapping("/sortDraft")
    ArrayList<EmailI> sortDraft(@RequestParam(value = "username") String username, @RequestParam(value = "target") String target, @RequestParam(value = "ascending") String ascending){
        try{
            Database database = Database.getInstance();
            EmailsSorterI sorter = new EmailsSorter(Boolean.parseBoolean(ascending));
            return sorter.sort(database.getProfilebyUsername("", username).getDraft().getEmails(), target);
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }
    @GetMapping("/filterDraft")
    ArrayList<EmailI> filterDraft(@RequestParam(value = "username") String username, @RequestParam(value = "target") String target, @RequestParam(value = "feature") String feature){
        try{
            Database database = Database.getInstance();
            EmailsCriteriaI filter = new EmailsFilteringCustomizedCriteria(feature, target);
            return filter.meetCriteria(database.getProfilebyUsername("", username).getDraft().getEmails());
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }
    @GetMapping("/searchDraft")
    ArrayList<EmailI> searchDraft(@RequestParam(value = "username") String username, @RequestParam(value = "target") String target){
        try{
            Database database = Database.getInstance();
            EmailsCriteriaI searcher = new EmailsSearchingCustomizedCriteria(target);
            return searcher.meetCriteria(database.getProfilebyUsername("", username).getDraft().getEmails());
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }
    @DeleteMapping("/deleteForeverDraft")
    ArrayList<EmailI> deleteForever(@RequestBody Email email){
        try{

            FirstHandler.getInstance().handle("DeleteForever", email, "");

            return null;
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }

}
