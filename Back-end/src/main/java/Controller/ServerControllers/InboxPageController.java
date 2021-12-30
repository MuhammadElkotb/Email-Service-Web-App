package Controller.ServerControllers;

import Controller.EmailsFilter.EmailsCriteriaI;
import Controller.EmailsFilter.EmailsFilteringCustomizedCriteria;
import Controller.EmailsFilter.EmailsSearchingCustomizedCriteria;
import Controller.Profile.Elements.Email.Email;
import Controller.Profile.Elements.Email.EmailI;
import Controller.SingletonClasses.Database;
import Controller.SingletonClasses.Handlers.FirstHandler;
import Controller.Sorter.EmailsSorter;
import Controller.Sorter.EmailsSorterI;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class InboxPageController {

    @PostMapping("/movetoTrashInbox")
    ArrayList<EmailI> movetoTrash(@RequestBody Email email){
        try{
            FirstHandler.getInstance().handle("MovetoTrash",email, "");
            return null;

        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }

    @GetMapping("/getInbox")
    ArrayList<EmailI> getInbox(@RequestParam(value = "username") String username, @RequestParam(value = "priority") String priority){
        try{
            if(!Boolean.parseBoolean(priority)){
                EmailsSorterI emailsSorter = new EmailsSorter(false);
                return emailsSorter.sort(Database.getInstance().getProfilebyUsername("", username).getInbox().getEmails(), "date");
            }
            else{
                return new ArrayList<EmailI>(Database.getInstance().getProfilebyUsername("", username).getInbox().getEmailsPrioritized());
            }
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }



    @GetMapping("/sortInbox")
    ArrayList<EmailI> sortInbox(@RequestParam(value = "username") String username, @RequestParam(value = "target") String target, @RequestParam(value = "ascending") String ascending){
        try{
            Database database = Database.getInstance();
            EmailsSorterI sorter = new EmailsSorter(Boolean.parseBoolean(ascending));
            return sorter.sort(database.getProfilebyUsername("", username).getInbox().getEmails(), target);
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }
    @GetMapping("/filterInbox")
    ArrayList<EmailI> filterInbox(@RequestParam(value = "username") String username, @RequestParam(value = "target") String target, @RequestParam(value = "feature") String feature){
        try{
            Database database = Database.getInstance();
            EmailsCriteriaI filter = new EmailsFilteringCustomizedCriteria(feature, target);
            return filter.meetCriteria(database.getProfilebyUsername("", username).getInbox().getEmails());
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }

    @GetMapping("/searchInbox")
    ArrayList<EmailI> searchInbox(@RequestParam(value = "username") String username, @RequestParam(value = "target") String target){
        try{
            Database database = Database.getInstance();
            EmailsCriteriaI searcher = new EmailsSearchingCustomizedCriteria(target);
            System.out.println("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            return searcher.meetCriteria(database.getProfilebyUsername("", username).getInbox().getEmails());
        }
        catch (Exception e){

            System.out.println(e.getMessage());
            return null;
        }
    }

}
