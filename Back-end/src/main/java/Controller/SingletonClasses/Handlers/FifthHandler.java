package Controller.SingletonClasses.Handlers;

import Controller.Profile.Elements.Email.EmailI;
import Controller.Profile.ProfileI;
import Controller.SingletonClasses.Creator;
import Controller.SingletonClasses.Database;
import Controller.SingletonClasses.Deleter;

public class FifthHandler implements HandlerI{
    private final String concern = "DeleteForever";
    private HandlerI successor = SixthHandler.getInstance();
    private static FifthHandler instance = null;

    private FifthHandler(){}
    public static FifthHandler getInstance(){
        if(instance == null){
            return new FifthHandler();
        }else {
            return instance;
        }
    }


    @Override
    public void handle(String concern, EmailI email, String folderName) throws Exception {
        if(concern == this.concern){

            Database database = Database.getInstance();

            if(email.getEmailType().equals("Draft")){
                Deleter.getInstance().deleteEmailDataDraft(email, database.getProfilebyUsername("", email.getOwner()));
                database.getProfilebyUsername("", email.getOwner()).getDraft().removeEmailbyID(email.getEmailID());
            }
            else{
                Deleter.getInstance().deleteEmailDataTrash(email, database.getProfilebyUsername("", email.getOwner()));
                database.getProfilebyUsername("", email.getOwner()).getTrash().removeEmailbyID(email.getEmailID());
            }


        }else{
            if(this.successor == null){
                throw new Exception("NO HANDLER CAN HANDLE THIS CONCERN");
            }
            this.successor.handle(concern, email, folderName);
        }

    }
}
