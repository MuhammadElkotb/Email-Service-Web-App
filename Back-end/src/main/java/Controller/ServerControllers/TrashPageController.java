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
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TrashPageController {
    @GetMapping("/getTrash")
    ArrayList<EmailI> getTrash(@RequestParam(value = "username") String username, @RequestParam(value = "priority") String priority){
        try{
            EmailsSorterI emailsSorter = new EmailsSorter(false);
            return emailsSorter.sort(Database.getInstance().getProfilebyUsername("", username).getTrash().getEmails(), "date");
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }
    @GetMapping("/sortTrash")
    ArrayList<EmailI> sortTrash(@RequestParam(value = "username") String username, @RequestParam(value = "target") String target, @RequestParam(value = "ascending") String ascending){
        try{
            Database database = Database.getInstance();
            EmailsSorterI sorter = new EmailsSorter(Boolean.parseBoolean(ascending));
            return sorter.sort(database.getProfilebyUsername("", username).getTrash().getEmails(), target);
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }
    @GetMapping("/filterTrash")
    ArrayList<EmailI> filterTrash(@RequestParam(value = "username") String username, @RequestParam(value = "target") String target, @RequestParam(value = "feature") String feature){
        try{
            Database database = Database.getInstance();
            EmailsCriteriaI filter = new EmailsFilteringCustomizedCriteria(feature, target);
            return filter.meetCriteria(database.getProfilebyUsername("", username).getTrash().getEmails());
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }
    @GetMapping("/searchTrash")
    ArrayList<EmailI> searchTrash(@RequestParam(value = "username") String username, @RequestParam(value = "target") String target){
        try{
            Database database = Database.getInstance();
            EmailsCriteriaI searcher = new EmailsSearchingCustomizedCriteria(target);
            return searcher.meetCriteria(database.getProfilebyUsername("", username).getTrash().getEmails());
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }
    @DeleteMapping("/deleteForever")
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
    @PostMapping("/restore")
    ArrayList<EmailI> restore(@RequestBody Email email){
        try{
            System.out.println("OWNER CONTOLEER " + email.getOwner());
            FirstHandler.getInstance().handle("Restore", email, "");
            return null;
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }
}
