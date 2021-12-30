package Controller.SingletonClasses.Handlers;

import Controller.Profile.Elements.Email.EmailI;
import Controller.SingletonClasses.Creator;
import Controller.SingletonClasses.Database;
import Controller.SingletonClasses.Deleter;

public class SixthHandler implements HandlerI{
    private final String concern = "Restore";
    private HandlerI successor = null;
    private static SixthHandler instance = null;

    private SixthHandler(){}
    public static SixthHandler getInstance(){
        if(instance == null){
            return new SixthHandler();
        }else {
            return instance;
        }
    }


    @Override
    public void handle(String concern, EmailI email, String folderName) throws Exception {
        if(concern == this.concern){
            Database database = Database.getInstance();

            Deleter.getInstance().deleteEmailDataTrash(email, database.getProfilebyUsername("", email.getOwner()));
            database.getProfilebyUsername("", email.getOwner()).getTrash().removeEmailbyID(email.getEmailID());

            if(email.getEmailType().equals("Inbox")){
                Creator.getInstance().createEmailDataInbox(email, database.getProfilebyUsername("", email.getOwner()), email.getEmailID(), 0);
                database.getProfilebyUsername("", email.getOwner()).getInbox().addEmail(email);
            }
            if(email.getEmailType().equals("Sent")){
                Creator.getInstance().createEmailDataSent(email, database.getProfilebyUsername("", email.getOwner()), email.getEmailID());
                database.getProfilebyUsername("", email.getOwner()).getSent().addEmail(email);
            }

        }else{
            if(this.successor == null){
                throw new Exception("NO HANDLER CAN HANDLE THIS CONCERN");
            }
            this.successor.handle(concern, email, folderName);
        }
    }
}
