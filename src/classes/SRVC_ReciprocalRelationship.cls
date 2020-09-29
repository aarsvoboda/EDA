/*
    Copyright (c) 2020, Salesforce.org
    All rights reserved.

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this List of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this List of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of Salesforce.org nor the names of
      its contributors may be used to endorse or promote products derived
      from this software without specific prior written permission.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
    "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
    LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
    FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
    COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
    INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
    BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
    LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
    CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
    LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
    ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
    POSSIBILITY OF SUCH DAMAGE.
*/
/**
* @author Salesforce.org
* @date 2020
* @group 
* @group-content ../../ApexDocContent/
* @description Service class for reciprocal relationships. 
*/
public virtual with sharing class SRVC_ReciprocalRelationship {
    /*********************************************
    * @description Instance for Singleton Pattern.
    **********************************************/
    @TestVisible
    private static SRVC_ReciprocalRelationship instance;

    /*********************************************************************
    * @description Empty constructor is not public for Singleton Pattern.
    **********************************************************************/
    protected SRVC_ReciprocalRelationship() {}

    /*****************************************************************************
    * @description Static method to get the current instance for Singleton pattern.
    * @return The instance of SRVC_ReciprocalRelationship.
    ******************************************************************************/
    public static SRVC_ReciprocalRelationship getInstance() {
        if (SRVC_ReciprocalRelationship.instance == null) {
            SRVC_ReciprocalRelationship.instance = new SRVC_ReciprocalRelationship();
        }

        return SRVC_ReciprocalRelationship.instance;
    }
    
    /*****************************************************************************
    * TODO: @description Get the relationships to update from map of contact and map of relationship to update
    * @return The instance of SRVC_ReciprocalRelationship.
    ******************************************************************************/
    public List<Relationship__c> getRelationshipsToUpdateForContacts(Map<Id, Contact> newContactRelationshipToUpdateByIdMap, Map<Id, Relationship__c> relationshipsByIdToUpdateMap) {
        // Takes in a Map<Id,Contact> of contacts by contact ids for the update and a Map<Id,Relationship__c> of relationships by relationship ids to check for update
        // Create a list of Relationships to update
        List<Relationship__c> relationshipsToUpdateList = new List<Relationship__c>();
        // For each relationship in the map’s values
        for (Relationship__c relationship : relationshipsByIdToUpdateMap.values()) {
            // If relationshipIsReciprocal is false
            if (this.isRelationshipReciprocal(relationship, newContactRelationshipToUpdateByIdMap.keySet()) == false) {
                // Get the reciprocal relationship using the relationship map
                Relationship__c reciprocalRelationship = relationshipsByIdToUpdateMap.get(relationship.ReciprocalRelationship__c);
                // Set the reciprocal relationship’s type to the relationship’s type
                relationship.Type__c = reciprocalRelationship.Type__c;
                // Add the reciprocal relationship to the list of relationships to update
                relationshipsToUpdateList.add(relationship);
            }
        }
            
        // Return the list of Relationships to update
        return relationshipsToUpdateList;
    }

    /*****************************************************************************
    * TODO: @description Static method to get the current instance for Singleton pattern.
    * @return The instance of SRVC_ReciprocalRelationship.
    ******************************************************************************/
    protected boolean isRelationshipReciprocal(Relationship__c relationship, Set<Id> contactIdsSet) {
        // Takes in a Relationship and a Contact Id Set
        // return if the Relationship’s Related Contact is in the Contact Id set    
        return contactIdsSet.contains(relationship.RelatedContact__c);
    }

    /*****************************************************************************
    * @description Check if Contact relationships should be updated.
    * @return If Contact relationships should be updated.
    ******************************************************************************/
    public boolean shouldUpdateContactRelationships(Contact newContact, Contact oldContact) {
        // Takes in a new Contact and an old Contact
        return oldContact.Gender__c != newContact.Gender__c;        
    }

    /*****************************************************************************
    * TODO: @description Static method to get the current instance for Singleton pattern.
    * @return The instance of SRVC_ReciprocalRelationship.
    ******************************************************************************/
    public Map<Id, Relationship__c> getRelationshipsForContacts(Set<Id> contactIdsSet) {
        // Takes a set of contact ids
        // return a map of Relationship__c by Id created from the following query:
        List<Relationship__c> relationshipsForContacts = [SELECT Id,
                                                                Contact__c,
                                                                RelatedContact__c,
                                                                ReciprocalRelationship__c,
                                                                Type__c
                                                        FROM Relationship__c
                                                        WHERE Contact__c IN :contactIdsSet
                                                            OR RelatedContact__c IN :contactIdsSet];
        return new Map<Id, Relationship__c>(relationshipsForContacts);
    }  
}