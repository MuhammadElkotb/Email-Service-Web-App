package Controller.SingletonClasses.Handlers;

import Controller.Email.EmailI;
import Controller.Profile.ProfileI;
import Controller.SingletonClasses.Creator;
import Controller.SingletonClasses.Database;
import Controller.SingletonClasses.Deleter;


public class ThirdHandler implements HandlerI {

    private final String concern = "CreateProfileFolder";
    private HandlerI successor = null;
    private static ThirdHandler instance = null;

    private ThirdHandler(){}
    public static ThirdHandler getInstance(){
        if(instance == null){
            return new ThirdHandler();
        }else {
            return instance;
        }

    }
    @Override
    public void handle(String concern, EmailI email) throws Exception {
        if(concern == this.concern){


        }else{
            if(this.successor == null){
                throw new Exception("NO HANDLER CAN HANDLE THIS CONCERN");
            }
            this.successor.handle(concern,email);
        }
    }
}
