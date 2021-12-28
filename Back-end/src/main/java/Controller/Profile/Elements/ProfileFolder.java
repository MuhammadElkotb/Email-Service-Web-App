package Controller.Profile.Elements;

import Controller.DataContainerI;
import Controller.Profile.Elements.Email.Email;
import Controller.Profile.Elements.Email.EmailI;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.FileFilter;
import java.util.ArrayList;

public class ProfileFolder implements ProfileFolderI {
    private String name;
    private DataContainerI folderDataContainer;
    private ArrayList<EmailI> emails;

    public ProfileFolder(DataContainerI folderDataContainer, String name) throws Exception{
        this.folderDataContainer = folderDataContainer;
        this.emails = new ArrayList<EmailI>();
        this.setEmails();
        this.name = name;
    }


    @Override
    public ArrayList<EmailI> getEmails() {
        return this.emails;
    }

    @Override
    public void addEmail(EmailI email) {
        this.emails.add(email);
    }

    @Override
    public void removeEmail(EmailI email) {
        this.emails.remove(email);
    }

    @Override
    public void removeEmailbyID(String ID) {
        for(int i = 0; i < this.emails.size(); i++){
            if(ID.equals(this.emails.get(i).getEmailID())){
                this.emails.remove(i);
            }
        }
    }

    @Override
    public String getName() {
        return this.name;
    }

    @Override
    public void setName(String name) {
        this.name = name;
    }

    private void setEmails() throws Exception {
        File file = new File(this.folderDataContainer.getDataContainerPath().concat("/"));
        File[] files = file.listFiles(new FileFilter() {
            @Override
            public boolean accept(File pathname) {
                return pathname.isFile();
            }
        });
        if(file == null || files == null){
            throw new Exception("NO SUCH DIRECOTRY");
        }
        for(int i = 0; i < files.length; i++){
            ObjectMapper map = new ObjectMapper();
            EmailI email = map.readValue(files[i], Email.class);
            this.addEmail(email);
        }
    }

    @Override
    public EmailI getEmailbySubject(String subject){
        EmailI email = null;
        for(int i = 0; i < this.emails.size(); i++){
            if(subject.equals(this.emails.get(i).getSubject())){
                email = this.emails.get(i);
            }
        }
        return email;
    }

    @Override
    public EmailI getEmailbyBody(String body) {
        EmailI email = null;
        for(int i = 0; i < this.emails.size(); i++){
            if(body.equals(this.emails.get(i).getBody())){
                email = this.emails.get(i);
            }
        }
        return email;
    }

    @Override
    public EmailI getEmailbySenderUsername(String username) {
        EmailI email = null;
        for(int i = 0; i < this.emails.size(); i++){
            if(username.equals(this.emails.get(i).getSenderUsername())){
                email = this.emails.get(i);
            }
        }
        return email;
    }

    @Override
    public EmailI getEmailbyreceiverUsername(String username) {
        EmailI email = null;
        for(int i = 0; i < this.emails.size(); i++){
            if(username.equals(this.emails.get(i).getReceiversUsernames().get(0))){
                email = this.emails.get(i);
            }
        }
        return email;
    }
    @Override
    public EmailI getEmailbyID(String ID) {
        EmailI email = null;
        for(int i = 0; i < this.emails.size(); i++){
            if(ID.equals(this.emails.get(i).getEmailID())){
                email = this.emails.get(i);
            }
        }
        return email;
    }

    @Override
    public DataContainerI getFolderDataContainer() {
        return this.folderDataContainer;
    }

    @Override
    public void setFolderDataContainer(DataContainerI inboxDataContainer) {
        this.folderDataContainer = inboxDataContainer;
    }
}
